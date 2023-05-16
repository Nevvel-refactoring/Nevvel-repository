package com.ssafy.novvel.episode.repository;

import com.ssafy.novvel.episode.entity.EpisodeMemberID;
import com.ssafy.novvel.episode.entity.ReadEpisode;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ReadEpisodeRepository extends JpaRepository<ReadEpisode, EpisodeMemberID> {
    Optional<ReadEpisode> findTopByMemberIdOrderByLastModifyedDateTimeDesc(Long memberId);


}
