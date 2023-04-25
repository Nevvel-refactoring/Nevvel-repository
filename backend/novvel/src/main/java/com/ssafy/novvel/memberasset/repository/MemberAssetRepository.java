package com.ssafy.novvel.memberasset.repository;

import com.ssafy.novvel.asset.entity.Asset;
import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.memberasset.entity.MemberAsset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MemberAssetRepository extends JpaRepository<MemberAsset, Long> {

    List<MemberAsset> findByMemberAndAssetIn(Member member, List<Asset> assets);
}
