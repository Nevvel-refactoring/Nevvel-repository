package com.ssafy.novvel.cover.repository;

import com.ssafy.novvel.cover.dto.EpisodeInfoDto;
import com.ssafy.novvel.cover.entity.Cover;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface CoverRepository extends JpaRepository<Cover, Long>, CoverRepositoryCustom {

    @Query(
        "SELECT new com.ssafy.novvel.cover.dto.EpisodeInfoDto(e.id, e.point, e.viewCount, e.lastModifyedDateTime"
            + ", th.pointChangeType, (me.member.id IS NOT NULL)) "
            +
            "FROM Episode as e " +
            "LEFT JOIN ReadEpisode me ON me.episode = e AND me.member.id = :memberId " +
            "LEFT JOIN TransactionHistory th "
            + "ON th.episode = e AND th.member.id = :memberId "
            +
            "WHERE e.cover.id = :coverId AND e.statusType <> 'TEMPORARY' "
            + "AND (case when ((th.id IS NULL OR th.pointChangeType <> 'BUY_EPISODE') AND e.statusType = 'DELETED') then TRUE else FALSE END) = false")
    List<EpisodeInfoDto> findEpisodesInfoDto(@Param("coverId") Long coverId,
        @Param("memberId") Long memberId);
}
