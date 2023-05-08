package com.ssafy.novvel.episode.repository;

import com.ssafy.novvel.cover.entity.Cover;
import com.ssafy.novvel.episode.entity.Episode;
import com.ssafy.novvel.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EpisodeRepository extends JpaRepository<Episode, Long> {

    @Query("SELECT ep FROM Episode ep LEFT JOIN fetch ep.cover WHERE ep.id in :ids")
    List<Episode> findByIdInIds(@Param("ids") List<Long> ids);

    @Query("SELECT MAX(ep.id) FROM Episode ep WHERE ep.statusType = 'PUBLISHED'" +
            "AND ep.cover = :cover AND ep.id < :id")
    Long findPrevEpisodeId(@Param("id") Long id, @Param("cover") Cover cover);

    @Query("SELECT MIN(ep.id) FROM Episode ep WHERE ep.statusType = 'PUBLISHED' " +
            "AND ep.cover = :cover AND ep.id > :id")
    Long findNextEpisodeId(@Param("id") Long id, @Param("cover") Cover cover);

}
