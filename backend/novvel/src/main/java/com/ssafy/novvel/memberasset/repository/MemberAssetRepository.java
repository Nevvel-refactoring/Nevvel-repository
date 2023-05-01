package com.ssafy.novvel.memberasset.repository;

import com.ssafy.novvel.asset.entity.Asset;
import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.memberasset.entity.MemberAsset;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MemberAssetRepository extends JpaRepository<MemberAsset, Long> {

    List<MemberAsset> findByMemberAndAssetIn(Member member, List<Asset> assets);

    @Query("SELECT ma FROM MemberAsset ma LEFT JOIN fetch ma.asset WHERE ma.member = :member")
    List<MemberAsset> findByMember(@Param("member") Member member);

    Optional<MemberAsset> findByAssetAndMember(Asset asset, Member member);

}
