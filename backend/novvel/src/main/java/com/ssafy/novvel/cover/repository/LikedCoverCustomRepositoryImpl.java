package com.ssafy.novvel.cover.repository;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQuery;
import com.ssafy.novvel.cover.dto.CoverWithConditions;
import com.ssafy.novvel.cover.entity.Cover;
import com.ssafy.novvel.cover.util.DefaultImage;
import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.util.QueryDslUtil;
import java.time.LocalDate;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;
import static com.ssafy.novvel.cover.entity.QCover.cover;
import static com.ssafy.novvel.cover.entity.QLikedCover.likedCover;
import static org.springframework.util.ObjectUtils.isEmpty;

@RequiredArgsConstructor
public class LikedCoverCustomRepositoryImpl implements LikedCoverCustomRepository {
    private final EntityManager entityManager;

    @Override
    @Transactional
    public Page<CoverWithConditions> getLikedCovers(Member member, Pageable pageable, DefaultImage defaultImage) {
        entityManager.merge(member);

        JPAQuery<List<Cover>> query = new JPAQuery<>(entityManager);
        JPAQuery<Long> countQuery = new JPAQuery<>(entityManager);

        List<OrderSpecifier> ORDERS = getAllOrderSpecifiers(pageable);

        List<Cover> coverList = query
                .select(cover)
                .from(cover)
                .where(
                    cover.in(
                            JPAExpressions
                            .select(likedCover.cover)
                            .from(likedCover)
                            .where(
                                    likedCover.member.eq(member)
                            ))
                )
                .leftJoin(cover.resource)
                .fetchJoin()
                .leftJoin(cover.genre)
                .fetchJoin()
                .orderBy(ORDERS.stream().toArray(OrderSpecifier[]::new))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();


        Long count = countQuery
                .select(likedCover.count())
                .from(likedCover)
                .where(
                        likedCover.member.eq(member)
                )
                .fetchOne();


        return new PageImpl<>(
                coverList.stream().map(c -> covertCoverWithConditions(c, defaultImage)).collect(
                    Collectors.toList()),
                pageable,
                count == null ? 0 : count
        );

    }

    private List<OrderSpecifier> getAllOrderSpecifiers(Pageable pageable) {

        List<OrderSpecifier> ORDERS = new ArrayList<>();

        if (!isEmpty(pageable.getSort())) {
            for (Sort.Order order : pageable.getSort()) {
                Order direction = order.getDirection().isAscending() ? Order.ASC : Order.DESC;
                switch (order.getProperty()) {
                    case "id":
                        OrderSpecifier<?> orderId = QueryDslUtil.getSortedColumn(direction, cover.id, "id");
                        ORDERS.add(orderId);
                        break;
                    case "title":
                        OrderSpecifier<?> orderTitle = QueryDslUtil.getSortedColumn(direction, cover.title, "title");
                        ORDERS.add(orderTitle);
                        break;
                    case "firstPublishDate":
                        OrderSpecifier<?> orderFirstPublishDate = QueryDslUtil.getSortedColumn(direction, cover.firstPublishDate, "firstPublishDate");
                        ORDERS.add(orderFirstPublishDate);
                        break;
                    case "lastPublishDate":
                        OrderSpecifier<?> orderLastPublishDate = QueryDslUtil.getSortedColumn(direction, cover.lastPublishDate, "lastPublishDate");
                        ORDERS.add(orderLastPublishDate);
                        break;
                    case "createdDateTime":
                        OrderSpecifier<?> orderCreatedDateTime = QueryDslUtil.getSortedColumn(direction, cover.createdDateTime, "createdDateTime");
                        ORDERS.add(orderCreatedDateTime);
                        break;
                    case "lastModifyedDateTime":
                        OrderSpecifier<?> orderLastModifiedDateTime = QueryDslUtil.getSortedColumn(direction, cover.lastModifyedDateTime, "lastModifyedDateTime");
                        ORDERS.add(orderLastModifiedDateTime);
                        break;
                    case "likes":
                        OrderSpecifier<?> orderLikes = QueryDslUtil.getSortedColumn(direction, cover.likes, "likes");
                        ORDERS.add(orderLikes);
                        break;
                    case "viewCount":
                        OrderSpecifier<?> orderViewCount = QueryDslUtil.getSortedColumn(direction, cover.viewCount, "viewCount");
                        ORDERS.add(orderViewCount);
                        break;
                    default:
                        break;
                }
            }
        }

        return ORDERS;

    }

    private CoverWithConditions covertCoverWithConditions(Cover cover, DefaultImage defaultImage) {

        String thumbnail = null;
        if (cover.getResource() != null) {
            thumbnail = cover.getResource().getThumbnailUrl();
        }

        return CoverWithConditions.builder()
            .id(cover.getId())
            .title(cover.getTitle())
            .status(cover.getCoverStatusType())
            .thumbnail(thumbnail == null ?
                defaultImage.getImageByGenreName(cover.getGenre().getName())
                : thumbnail)
            .genre(cover.getGenre())
            .writerId(cover.getMember().getId())
            .writerNickname(cover.getMember().getNickname())
            .isUploaded(cover.getLastPublishDate() == null ? Boolean.FALSE
                : cover.getLastPublishDate().isAfter(LocalDate.now().minusDays(7L)))
            .isNew(cover.getFirstPublishDate() == null ? Boolean.FALSE
                : cover.getFirstPublishDate().isAfter(LocalDate.now().minusDays(7L)))
            .likes(cover.getLikes())
            .build();
    }
}

