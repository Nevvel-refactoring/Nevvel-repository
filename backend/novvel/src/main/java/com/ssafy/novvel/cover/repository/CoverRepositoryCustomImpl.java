package com.ssafy.novvel.cover.repository;

import com.querydsl.core.types.Expression;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.jpa.impl.JPAQuery;
import com.ssafy.novvel.cover.dto.CoverSearchConditions;
import com.ssafy.novvel.cover.dto.CoverSortType;
import com.ssafy.novvel.cover.dto.CoverWithConditions;
import com.ssafy.novvel.cover.dto.QCoverWithConditions;
import com.ssafy.novvel.cover.entity.CoverStatusType;
import com.ssafy.novvel.episode.entity.EpisodeStatusType;
import java.time.LocalDateTime;
import java.util.List;
import javax.persistence.EntityManager;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import static com.ssafy.novvel.cover.entity.QCover.cover;
import static com.ssafy.novvel.episode.entity.QEpisode.episode;


@Slf4j
public class CoverRepositoryCustomImpl implements CoverRepositoryCustom {

    private final EntityManager entityManager;

    public CoverRepositoryCustomImpl(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public Page<CoverWithConditions> searchCover(CoverSearchConditions coverSearchConditions,
        Pageable pageable) {

        JPAQuery<List<CoverWithConditions>> query = new JPAQuery<>(entityManager);

        List<CoverWithConditions> content = query.select(new QCoverWithConditions(cover))
            .from(cover)
            .leftJoin(cover.resource)
            .fetchJoin()
            .leftJoin(cover.member)
            .fetchJoin()
            .leftJoin(cover.genre)
            .fetchJoin()
            .where(
                checkStatus(coverSearchConditions.getStatus()),
                checkGenre(coverSearchConditions.getGenre()),
                cover.firstPublishDate.isNotNull()
            )
            .orderBy(order(coverSearchConditions.getSorttype()))
            .offset(pageable.getOffset())
            .limit(pageable.getPageSize())
            .fetch();

        return new PageImpl<>(
            content,
            pageable, content.size());
    }

    private Predicate checkStatus(CoverStatusType coverStatusType) {
        switch (coverStatusType) {
            case FINISHED:
                return cover.coverStatusType.eq(CoverStatusType.FINISHED);
            case SERIALIZED:
                return cover.coverStatusType.eq(CoverStatusType.SERIALIZED);
            case ALL:
            default:
                return cover.coverStatusType.ne(CoverStatusType.DELETED);
        }
    }

    private Predicate checkGenre(Long genreId) {
        if (genreId.equals(1L)) {
            return null;
        }
        return cover.genre.id.eq(genreId);
    }

    private OrderSpecifier<?> order(CoverSortType coverSortType) {

        switch (coverSortType) {
            case DATE:
                return new OrderSpecifier<>(Order.DESC, cover.lastPublishDate);
            case LIKE:
                return new OrderSpecifier<>(Order.DESC, cover.likes.coalesce(0L));
            case HIT:
            default:
                return new OrderSpecifier<>(Order.DESC, cover.viewCount.coalesce(0L));
        }
    }
}
