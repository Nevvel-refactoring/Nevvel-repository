package com.ssafy.novvel.cover.repository;

import com.ssafy.novvel.cover.entity.CoverMemberID;
import com.ssafy.novvel.cover.entity.PurchasedCover;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PurchasedCoverRepository extends JpaRepository<PurchasedCover, CoverMemberID> {
}
