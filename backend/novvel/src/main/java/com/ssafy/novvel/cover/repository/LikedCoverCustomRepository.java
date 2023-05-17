package com.ssafy.novvel.cover.repository;

import com.ssafy.novvel.cover.dto.CoverWithConditions;
import com.ssafy.novvel.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface LikedCoverCustomRepository {
    Page<CoverWithConditions> getLikedCovers(Member member, Pageable pageable);
}
