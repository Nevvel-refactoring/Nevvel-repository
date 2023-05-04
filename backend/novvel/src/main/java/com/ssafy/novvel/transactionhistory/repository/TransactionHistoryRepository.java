package com.ssafy.novvel.transactionhistory.repository;

import com.ssafy.novvel.episode.entity.Episode;
import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.transactionhistory.entity.TransactionHistory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface TransactionHistoryRepository extends JpaRepository<TransactionHistory, Long> {

    Optional<TransactionHistory> findByMemberAndEpisode(Member member, Episode episode);

    @Query("SELECT th.episode FROM TransactionHistory th WHERE th.episode IS NOT NULL AND th.member = :member AND th.pointChangeType = 'BUY_EPISODE'")
    Page<Episode> findByMemberAndEpisodeNotNull(@Param(value = "member") Member member, Pageable pageable);

}
