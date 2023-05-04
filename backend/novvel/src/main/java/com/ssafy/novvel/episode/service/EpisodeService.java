package com.ssafy.novvel.episode.service;

import com.ssafy.novvel.episode.dto.*;
import com.ssafy.novvel.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface EpisodeService {
    EpisodeContextDto getEpisodeInfo(Long episodeId, Member member) ;
    Long createEpisode(EpisodeRegistDto episodeRegistDto, Member member);
    void deleteEpisode(Long episodeId, Long memberId);
    void updateEpisode(Long episodeId, EpisodeRegistDto episodeRegistDto, Member member);
    Integer purchaseEpisode(EpisodePurchasingDto episodePurchasingDto, Member member);
    Page<EpisodePurchasedOnDto> getPurchasedOnEp(Member member, Pageable pageable);
}
