package com.ssafy.novvel.cover.repository;

import com.ssafy.novvel.cover.entity.CoverMemberID;
import com.ssafy.novvel.cover.entity.LikedCover;
import com.ssafy.novvel.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikedCoverRepository extends JpaRepository<LikedCover, CoverMemberID>, LikedCoverCustomRepository {
    Optional<LikedCover> findByMemberAndCoverId(Member member, Long coverId);

}