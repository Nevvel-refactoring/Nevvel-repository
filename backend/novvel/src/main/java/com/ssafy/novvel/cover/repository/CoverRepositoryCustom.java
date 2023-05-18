package com.ssafy.novvel.cover.repository;

import com.ssafy.novvel.cover.dto.CoverSearchConditions;
import com.ssafy.novvel.cover.dto.CoverWithConditions;
import com.ssafy.novvel.cover.dto.EpisodeInfoDto;
import com.ssafy.novvel.cover.entity.Cover;
import com.ssafy.novvel.cover.util.DefaultImage;
import com.ssafy.novvel.member.entity.Member;
import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

public interface CoverRepositoryCustom {

    Page<CoverWithConditions> searchCover(CoverSearchConditions coverSearchConditions,
        Pageable pageable, DefaultImage defaultImage);

    List<EpisodeInfoDto> findEpisodesInfoDto(Cover cover, Member member);

    Page<CoverWithConditions> findCoverById(Member member, Long id, Pageable pageable,
        DefaultImage defaultImage);
}
