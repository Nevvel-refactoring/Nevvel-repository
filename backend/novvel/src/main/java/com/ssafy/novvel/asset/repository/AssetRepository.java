package com.ssafy.novvel.asset.repository;

import com.ssafy.novvel.asset.entity.Asset;
import com.ssafy.novvel.asset.entity.AssetType;
import com.ssafy.novvel.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface AssetRepository extends JpaRepository<Asset, Long>, AssetReposiotryCustom {
    @Query(value = "SELECT at FROM Asset at LEFT JOIN FETCH at.resource WHERE at.member = :member AND at.type = :assetType",
            countQuery = "SELECT COUNT(at) FROM Asset at WHERE at.member = :member AND at.type = :assetType")
    Page<Asset> findByMemberAndAssetType(@Param("member") Member member, @Param("assetType") AssetType assetType, Pageable pageable);

    @Query(value = "SELECT at FROM Asset at LEFT JOIN FETCH at.resource WHERE at.member = :member",
            countQuery = "SELECT COUNT(at) FROM Asset at WHERE at.member = :member")
    Page<Asset> findByMember(@Param("member") Member member, Pageable pageable);

    @Query("SELECT at FROM Asset at LEFT JOIN FETCH at.member WHERE at IN (:assets)")
    List<Asset> findJoinMemberByAssets(@Param("assets") List<Asset> assets);

    @Query("SELECT at FROM Asset at JOIN FETCH at.resource WHERE at IN (:assets)")
    Set<Asset> findJoinResourceByAssets(@Param("assets") List<Asset> Assets);
}

