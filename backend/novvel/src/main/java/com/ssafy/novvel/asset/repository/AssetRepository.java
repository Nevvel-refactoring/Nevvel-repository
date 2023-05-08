package com.ssafy.novvel.asset.repository;

import com.ssafy.novvel.asset.entity.Asset;
import com.ssafy.novvel.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssetRepository extends JpaRepository<Asset, Long>, AssetReposiotryCustom {
    Page<Asset> findByMember(Member member, Pageable pageable);

    @Query("SELECT at FROM Asset at LEFT JOIN FETCH at.member WHERE at IN (:assets)")
    List<Asset> findJoinMemberByAssets(@Param("assets") List<Asset> assets);
}

