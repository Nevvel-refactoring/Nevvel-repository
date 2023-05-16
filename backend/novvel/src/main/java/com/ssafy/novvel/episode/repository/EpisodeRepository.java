package com.ssafy.novvel.episode.repository;

import com.ssafy.novvel.cover.entity.Cover;
import com.ssafy.novvel.episode.entity.Episode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface EpisodeRepository extends JpaRepository<Episode, Long> {

    @Query("SELECT ep FROM Episode ep LEFT JOIN fetch ep.cover WHERE ep.id in :ids")
    List<Episode> findByIdInIds(@Param("ids") List<Long> ids);

    @Query("SELECT MAX(ep.id) FROM Episode ep WHERE ep.publishedDate = " +
            "(SELECT MAX(ep.publishedDate) FROM Episode ep WHERE ep.cover = :cover AND ep.publishedDate <= :time AND ep.id < :id)")
    Long findPrevEpisodeId(@Param("time") LocalDateTime time, @Param("cover") Cover cover, @Param("id") Long id);

    @Query("SELECT MIN(ep.id) FROM Episode ep WHERE ep.publishedDate = " +
            "(SELECT MIN(ep.publishedDate) FROM Episode ep WHERE ep.cover = :cover AND ep.publishedDate >= :time AND ep.id > :id)")
    Long findNextEpisodeId(@Param("time") LocalDateTime time, @Param("cover") Cover cover, @Param("id") Long id);

    List<Episode> findByReservationTimeBefore(LocalDateTime now);

}
