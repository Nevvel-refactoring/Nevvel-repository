package com.ssafy.novvel.cover.service;

import com.ssafy.novvel.cover.dto.CoverInfoAndEpisodesDto;
import com.ssafy.novvel.cover.dto.CoverModifyDto;
import com.ssafy.novvel.cover.dto.CoverPurchasedDto;
import com.ssafy.novvel.cover.dto.CoverRegisterDto;
import com.ssafy.novvel.cover.dto.CoverSearchConditions;
import com.ssafy.novvel.cover.dto.CoverWithConditions;
import com.ssafy.novvel.cover.entity.Cover;
import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.resource.entity.Resource;
import java.io.IOException;
import javax.naming.AuthenticationException;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

public interface CoverService {

    Cover registerCover(MultipartFile multipartFile, CoverRegisterDto coverRegisterDto,
                        Member member) throws IOException;

    CoverInfoAndEpisodesDto getAllEpisodes(Long coverId, Member member);

    Resource updateCover(MultipartFile multipartFile, Long coverId,
                         CoverModifyDto coverModifyDto,
                         Long userId) throws AuthenticationException, IOException;

    Page<CoverWithConditions> searchCoverWithCondition(CoverSearchConditions coverSearchConditions,
                                                       Pageable pageable);

    Page<CoverPurchasedDto> getPurchasedCover(Member member, Pageable pageable);

    Page<CoverWithConditions> getCoverOfUploader(Member member, Long id, Pageable pageable);

    int likeCover(Member member, Long coverId);

    Page<CoverWithConditions> getFavoriteCover(Member member, Pageable pageable);
}
