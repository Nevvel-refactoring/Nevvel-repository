package com.ssafy.novvel.asset.repository;

import com.querydsl.core.Tuple;
import com.querydsl.core.types.ExpressionUtils;
import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.Predicate;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.core.types.dsl.Expressions;
import com.querydsl.jpa.JPAExpressions;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.ssafy.novvel.asset.dto.AssetFilterDto;
import com.ssafy.novvel.asset.dto.AssetSearchDto;
import com.ssafy.novvel.asset.dto.AssetSearchReqKeywordTagDto;
import com.ssafy.novvel.asset.dto.SearchType;
import com.ssafy.novvel.asset.entity.Asset;
import com.ssafy.novvel.asset.entity.AssetType;
import com.ssafy.novvel.asset.entity.QAsset;
import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.memberasset.entity.QMemberAsset;
import com.ssafy.novvel.util.QueryDslUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import static com.ssafy.novvel.asset.entity.QAsset.asset;
import static com.ssafy.novvel.member.entity.QMember.member;
import static com.ssafy.novvel.asset.entity.QAssetTag.assetTag;
import static com.ssafy.novvel.memberasset.entity.QMemberAsset.memberAsset;
import static com.ssafy.novvel.resource.entity.QResource.resource;
import static org.springframework.util.ObjectUtils.isEmpty;

@Slf4j
@RequiredArgsConstructor
public class AssetRepositoryImpl implements AssetReposiotryCustom {
    private final EntityManager em;

    @Override
    @Transactional
    public Page<AssetSearchDto> searchAsset(AssetFilterDto assetFilterDto, Member searchMember, Pageable pageable) {
        log.info("run searchAsset method");
        if (searchMember != null) {
            em.merge(searchMember);
        }
        JPAQueryFactory queryFactory = new JPAQueryFactory(em);
        JPAQueryFactory countQueryFactory = new JPAQueryFactory(em);
        List<OrderSpecifier> ORDERS = getAllOrderSpecifiers(pageable);
        QAsset qAsset = asset;
        QMemberAsset qMemberAsset = memberAsset;
        List<Tuple> tuples = queryFactory
                .select(qAsset,
                        ExpressionUtils.as(isAvailable(qMemberAsset, qAsset, searchMember)
                                , "isAvailable")
                )
                .from(asset)
                .where(
                        checkAssetType(assetFilterDto.getAssettype())
                        , searchType(assetFilterDto.getSearchtype(), searchMember, qAsset)
                        , searchByTag(assetFilterDto.getTags(), qAsset)
                )
                .leftJoin(asset.member, member)
                .fetchJoin()
                .leftJoin(asset.resource, resource)
                .fetchJoin()
                .orderBy(ORDERS.stream().toArray(OrderSpecifier[]::new))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long count = countQueryFactory
                .select(qAsset.count())
                .from(asset)
                .where(
                        checkAssetType(assetFilterDto.getAssettype())
                        , searchType(assetFilterDto.getSearchtype(), searchMember, qAsset)
                        , searchByTag(assetFilterDto.getTags(), qAsset)
                )
                .fetchOne();

        Page<AssetSearchDto> result = new PageImpl<>(
                tuples.stream()
                        .map(tuple -> {
                            AssetSearchDto assetSearchDto = new AssetSearchDto(tuple.get(qAsset));
                            assetSearchDto.setIsAvailable(tuple.get(ExpressionUtils.path(Boolean.class, "isAvailable")));
                            return assetSearchDto;
                        })
                        .collect(Collectors.toList())
                , pageable,
                count
        );
        return result;
    }

    private BooleanExpression isAvailable(QMemberAsset qMemberAsset, QAsset qAsset, Member searchMember) {
        if (searchMember == null) {
            return Expressions.asBoolean(false);
        }
        return JPAExpressions
                .select(qMemberAsset)
                .from(qMemberAsset)
                .where(
                        qMemberAsset.asset.eq(qAsset),
                        findMemberAssetByMember(qMemberAsset, searchMember)
                ).exists();
    }

    private BooleanExpression findMemberAssetByMember(QMemberAsset qMemberAsset, Member searchMember) {
        if (searchMember == null) {
            return null;
        }
        return qMemberAsset.member.eq(searchMember);
    }

    private BooleanExpression checkAssetType(AssetType assetType) {
        if (assetType == null) {
            return null;
        }
        return asset.type.eq(assetType);
    }

    private BooleanExpression searchType(SearchType searchType, Member member, QAsset qAsset) {
        if (searchType == null || searchType == SearchType.ALL || member == null) {
            return null;
        }

        QMemberAsset qMemberAsset = QMemberAsset.memberAsset;

        return JPAExpressions
                .select(qMemberAsset)
                .from(qMemberAsset)
                .where(
                        qMemberAsset.asset.eq(qAsset),
                        qMemberAsset.member.eq(member)
                ).notExists();
//        return qMemberAsset.member.eq(member).and(qMemberAsset.asset.eq(asset));
    }

    private BooleanExpression searchByTag(List<String> tags, QAsset qAsset) {
        if (tags == null) {
            return null;
        }

        return JPAExpressions
                .select(assetTag)
                .from(assetTag)
                .where(
                        assetTag.asset.eq(qAsset),
                        assetTag.tag.tagName.in(tags)
                ).exists();
//        return assetTag.asset.eq(asset).and(assetTag.tag.tagName.in(tags));
    }


    @Override
    @Transactional
    public Page<AssetSearchDto> searchAssetByKeywordAndTags(AssetSearchReqKeywordTagDto reqKeywordTagDto, Member searchMember, Pageable pageable) {
        log.info("run searchAssetByKeywordAndTags method");
        if (searchMember != null) {
            em.merge(searchMember);
        }
        JPAQueryFactory queryFactory = new JPAQueryFactory(em);
        JPAQueryFactory countQueryFactory = new JPAQueryFactory(em);

        List<OrderSpecifier> ORDERS = getAllOrderSpecifiers(pageable);

        QAsset qAsset = asset;
        QMemberAsset qMemberAsset = memberAsset;

        List<Tuple> tuples = queryFactory
                .select(qAsset,
                        ExpressionUtils.as(
                                isAvailable(qMemberAsset, qAsset, searchMember)
                                , "isAvailable")
                )
                .from(asset)
                .where(
                        checkAssetType(reqKeywordTagDto.getAssetType()),
                        searchByKeword(reqKeywordTagDto.getKeyword()),
                        searchByTag(reqKeywordTagDto.getTags(), qAsset)
                )
                .leftJoin(asset.member, member)
                .fetchJoin()
                .leftJoin(asset.resource, resource)
                .fetchJoin()
                .orderBy(ORDERS.stream().toArray(OrderSpecifier[]::new))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long count = countQueryFactory
                .select(qAsset.count())
                .from(asset)
                .where(
                        checkAssetType(reqKeywordTagDto.getAssetType()),
                        searchByKeword(reqKeywordTagDto.getKeyword()),
                        searchByTag(reqKeywordTagDto.getTags(), qAsset)
                )
                .fetchOne();

        Page<AssetSearchDto> result = new PageImpl<>(
                tuples.stream()
                        .map(tuple -> {
                            AssetSearchDto assetSearchDto = new AssetSearchDto(tuple.get(qAsset));
                            assetSearchDto.setIsAvailable(tuple.get(ExpressionUtils.path(Boolean.class, "isAvailable")));
                            return assetSearchDto;
                        })
                        .collect(Collectors.toList())
                , pageable,
                count
        );
        return result;
    }

    @Override
    @Transactional
    public Page<AssetSearchDto> searchOwnAssets(AssetType assetType, Member member, Pageable pageable) {
        em.merge(member);

        JPAQueryFactory queryFactory = new JPAQueryFactory(em);
        JPAQueryFactory countQueryFactory = new JPAQueryFactory(em);

        List<OrderSpecifier> ORDERS = getAllOrderSpecifiers(pageable);

        QAsset qAsset = asset;
        QMemberAsset qMemberAsset = memberAsset;

        List<Asset> assets = queryFactory
                .selectDistinct(memberAsset.asset)
                .from(memberAsset)
                .where(
                        memberAsset.member.eq(member),
                        checkAssetType(assetType, memberAsset.asset)
                )
                .orderBy(ORDERS.stream().toArray(OrderSpecifier[]::new))
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .fetch();

        Long count = countQueryFactory
                .selectDistinct(memberAsset.asset.count())
                .from(memberAsset)
                .where(
                        memberAsset.member.eq(member),
                        checkAssetType(assetType, memberAsset.asset)
                )
                .fetchOne();

        Page<AssetSearchDto> result = new PageImpl<>(
                assets.stream()
                        .map(asset -> new AssetSearchDto(asset))
                        .collect(Collectors.toList())
                , pageable,
                count
        );
        return result;
    }

    private Predicate checkAssetType(AssetType assetType, QAsset qAsset) {
        if (assetType == null) {
            return null;
        }

        return qAsset.type.eq(assetType);
    }


    private BooleanExpression searchByKeword(String keyword) {
        return (keyword == null) ? null : asset.title.contains(keyword);
    }


    private List<OrderSpecifier> getAllOrderSpecifiers(Pageable pageable) {

        List<OrderSpecifier> ORDERS = new ArrayList<>();

        if (!isEmpty(pageable.getSort())) {
            for (Sort.Order order : pageable.getSort()) {
                Order direction = order.getDirection().isAscending() ? Order.ASC : Order.DESC;
                switch (order.getProperty()) {
                    case "downloadCount":
                        OrderSpecifier<?> orderDownloadCount = QueryDslUtil.getSortedColumn(direction, asset.downloadCount, "downloadCount");
                        ORDERS.add(orderDownloadCount);
                        break;
                    case "createdDateTime":
                        OrderSpecifier<?> orderCreatedDateTime = QueryDslUtil.getSortedColumn(direction, asset.createdDateTime, "createdDateTime");
                        ORDERS.add(orderCreatedDateTime);
                        break;
                    case "lastModifyedDateTime":
                        OrderSpecifier<?> orderLastModifiedDateTime = QueryDslUtil.getSortedColumn(direction, asset.lastModifyedDateTime, "lastModifyedDateTime");
                        ORDERS.add(orderLastModifiedDateTime);
                        break;
                    case "point":
                        OrderSpecifier<?> orderPoint = QueryDslUtil.getSortedColumn(direction, asset.point, "point");
                        ORDERS.add(orderPoint);
                        break;
                    default:
                        break;
                }
            }
        }

        return ORDERS;
    }


    /*
//    @Override
//    public Page<AssetSearchDto> searchAsset(AssetFilterDto assetFilterDto, Member searchMember, Pageable pageable) {
//        em.persist(searchMember);
//
//        QAsset qAsset = asset;
//        QMemberAsset qMemberAsset = memberAsset;
//        JPAQuery<Tuple> query = queryFactory
//                .select(qAsset,
//                        ExpressionUtils.as(JPAExpressions
//                                        .select(qMemberAsset)
//                                        .from(memberAsset)
//                                        .where(
//                                                qMemberAsset.asset.eq(qAsset),
//                                                qMemberAsset.member.eq(searchMember)
//                                        ).exists()
//                                , "isAvailable")
//                )
//                .from(asset)
//                .where(
//                        checkAssetType(assetFilterDto.getAssettype())
//                )
//                .leftJoin(asset.member, member)
//                .fetchJoin()
//                .leftJoin(asset.resource, resource)
//                .fetchJoin();
//
//        query = joinSearchType(assetFilterDto.getSearchtype(), query, qMemberAsset, searchMember);
////        query = joinByTags(assetFilterDto.getTags(), query, qAsset);
//        List<Tuple> tuples = excuteQuery(query, pageable);
//
//        Page<AssetSearchDto> result = new PageImpl<>(
//                tuples.stream()
//                        .map(tuple -> {
//                            AssetSearchDto assetSearchDto = new AssetSearchDto(tuple.get(qAsset));
//                            assetSearchDto.setIsAvailable(tuple.get(ExpressionUtils.path(Boolean.class, "isAvailable")));
//                            return assetSearchDto;
//                        })
//                        .collect(Collectors.toList())
//                , pageable,
//                tuples.size()
//        );
//        return result;
//    }
//
//    private JPAQuery<Tuple> joinSearchType(SearchType searchType, JPAQuery<Tuple> query,
//                                           QMemberAsset qMemberAsset, Member searchMember) {
//        if (searchType == null || searchType.equals(SearchType.ALL)) {
//            return query;
//        }
//        return query
//                .leftJoin(qMemberAsset)
//                .on(
//
//                        asset.eq(qMemberAsset.asset).and(qMemberAsset.member.eq(searchMember).not())
////                        asset.eq(qMemberAsset.asset).and(qMemberAsset.member.eq(searchMember)).not()
//                );
//
//    }
//
//    private JPAQuery<Tuple> joinByTags(List<String> tags, JPAQuery<Tuple> query, QAsset qAsset) {
//        if (tags == null) {
//            return query;
//        }
//
//        return query
//                .leftJoin(assetTag)
//                .on(
//                        qAsset.eq(assetTag.asset).and(assetTag.tag.tagName.in(tags))
//                );
//    }
//
//    private List<Tuple> excuteQuery(JPAQuery<Tuple> query, Pageable pageable) {
//        List<OrderSpecifier> ORDERS = getAllOrderSpecifiers(pageable);
//        return query.orderBy(ORDERS.stream().toArray(OrderSpecifier[]::new))
//                .offset(pageable.getOffset())
//                .limit(pageable.getPageSize())
//                .fetch();
//    }
//
//    private BooleanExpression checkAssetType(AssetType assetType) {
//        if (assetType == null) {
//            return null;
//        }
//        return asset.type.eq(assetType);
//    }
//
//    private BooleanExpression searchType(SearchType searchType, Member member, QAsset qAsset) {
//        if (searchType == null || searchType == SearchType.ALL) {
//            return null;
//        }
//
//        QMemberAsset qMemberAsset = QMemberAsset.memberAsset;
//
//        return JPAExpressions
//                .select(qMemberAsset)
//                .from(qMemberAsset)
//                .where(
//                        qMemberAsset.asset.eq(qAsset),
//                        qMemberAsset.member.eq(member)
//                ).notExists();
////        return qMemberAsset.member.eq(member).and(qMemberAsset.asset.eq(asset));
//    }
//
//    private BooleanExpression searchByTag(List<String> tags, QAsset qAsset) {
//        if (tags == null) {
//            return null;
//        }
//
//        return JPAExpressions
//                .select(assetTag)
//                .from(assetTag)
//                .where(
//                        assetTag.asset.eq(qAsset),
//                        assetTag.tag.tagName.in(tags)
//                ).exists();
////        return assetTag.asset.eq(asset).and(assetTag.tag.tagName.in(tags));
//    }
/////////////////////////////////////

 */
}
