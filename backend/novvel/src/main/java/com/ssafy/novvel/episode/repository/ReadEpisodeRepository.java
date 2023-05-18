package com.ssafy.novvel.episode.repository;

import com.ssafy.novvel.episode.entity.Episode;
import com.ssafy.novvel.episode.entity.EpisodeMemberID;
import com.ssafy.novvel.episode.entity.ReadEpisode;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ReadEpisodeRepository extends JpaRepository<ReadEpisode, EpisodeMemberID> {

    ReadEpisode findFirstByMember_IdAndEpisode_Cover_IdOrderByLastModifyedDateTimeDesc(Long memberId,
        Long coverId);


}
