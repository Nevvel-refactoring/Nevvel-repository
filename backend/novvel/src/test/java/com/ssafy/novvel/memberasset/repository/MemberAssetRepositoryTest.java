package com.ssafy.novvel.memberasset.repository;

import com.ssafy.novvel.asset.entity.Asset;
import com.ssafy.novvel.asset.entity.AssetType;
import com.ssafy.novvel.asset.repository.AssetRepository;
import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.member.repository.MemberRepository;
import com.ssafy.novvel.memberasset.entity.MemberAsset;
import com.ssafy.novvel.resource.entity.Resource;
import com.ssafy.novvel.resource.repository.ResourceRepository;
import com.ssafy.novvel.util.TestUtil;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

@DataJpaTest
//@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@ActiveProfiles("test")
public class MemberAssetRepositoryTest {

    @Autowired
    private MemberAssetRepository memberAssetRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private ResourceRepository resourceRepository;
    @Autowired
    private AssetRepository assetRepository;


    @Test
    void findPageByMemberTest() {

        Member owner = TestUtil.getMember();
        owner = memberRepository.save(owner);
        List<Member> members = TestUtil.getUSERMembers(4);
        members = memberRepository.saveAll(members);
        List<Resource> resources = TestUtil.getResources(4);
        resources = resourceRepository.saveAll(resources);
        List<Asset> assets = TestUtil.getAssetList(4, members, resources);
        assets = assetRepository.saveAll(assets);
        List<MemberAsset> memberAssets = TestUtil.getMemberAssets(owner, assets);
        memberAssets = memberAssetRepository.saveAll(memberAssets);
        Pageable pageable = PageRequest.of(0, 5);

        Page<MemberAsset> pageByMember = memberAssetRepository.findPageByMember(AssetType.IMAGE, owner, pageable);

        Assertions.assertThat(pageByMember.getContent().size()).isEqualTo(4);

    }
}
