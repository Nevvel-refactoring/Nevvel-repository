package com.ssafy.novvel.cover.repository;

import com.ssafy.novvel.cover.dto.CoverPurchasedDto;
import com.ssafy.novvel.cover.entity.Cover;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CoverRepository extends JpaRepository<Cover, Long>, CoverRepositoryCustom {


    @Query("SELECT c FROM Cover c JOIN FETCH c.member WHERE c.id = :id")
    Optional<Cover> findJoinMemberById(@Param("id") Long id);

    @Query(
        value =
            "SELECT new com.ssafy.novvel.cover.dto.CoverPurchasedDto(c, r.thumbnailUrl,"
                + " g, m.id, m.nickname) "
                + "FROM PurchasedCover as pc "
                + "LEFT JOIN Cover as c "
                + "ON pc.cover.id = c.id "
                + "LEFT JOIN Resource as r "
                + "ON c.resource.id = r.id "
                + "LEFT JOIN Genre as g "
                + "ON c.genre.id = g.id "
                + "LEFT JOIN Member as m "
                + "ON c.member.id = m.id "
                + "WHERE pc.member.id = :memberId ",
        countQuery = "SELECT COUNT (pc) "
            + "FROM PurchasedCover as pc "
            + "LEFT JOIN Cover as c "
            + "ON pc.cover.id = c.id "
            + "LEFT JOIN Resource as r "
            + "ON c.resource.id = r.id "
            + "LEFT JOIN Genre as g "
            + "ON c.genre.id = g.id "
            + "LEFT JOIN Member as m "
            + "ON c.member.id = m.id "
            + "WHERE pc.member.id = :memberId "
    )
    Page<CoverPurchasedDto> findPurchasedCoverByMember(@Param("memberId") Long memberId,
        Pageable pageable);

    @Query("SELECT c "
        + "FROM Cover AS c "
        + "LEFT JOIN FETCH c.resource "
        + "JOIN FETCH c.genre "
        + "JOIN FETCH c.member "
        + "WHERE c.id = :id ")
    Cover findCoverById(@Param("id") Long id);
}
