package com.ssafy.novvel.episode.repository;

import com.ssafy.novvel.episode.entity.Episode;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EpisodeRepository extends JpaRepository<Episode, Long> {

}
