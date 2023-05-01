package com.ssafy.novvel.asset.repository;

import com.ssafy.novvel.asset.entity.Asset;
import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.member.repository.MemberRepository;
import com.ssafy.novvel.resource.entity.Resource;
import com.ssafy.novvel.resource.repository.ResourceRepository;
import com.ssafy.novvel.util.TestUtil;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

@DataJpaTest
//@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@ActiveProfiles("test")
public class AssetRepositoryTest {
    @Autowired
    private AssetRepository assetRepository;
    @Autowired
    private ResourceRepository resourceRepository;
    @Autowired
    private MemberRepository memberRepository;

    @Test
//    @Disabled
    void findJoinMemberByAssetsTest(){
        List<Resource> resources = resourceRepository.saveAll(TestUtil.getResources(2));
        List<Member> members = memberRepository.saveAll(TestUtil.getUSERMembers(2));
        List<Asset> assets = assetRepository.saveAll(TestUtil.getAssetList(2, members, resources));

        List<Asset> result=  assetRepository.findJoinMemberByAssets(assets);

        Assertions.assertThat(result.size()).isEqualTo(2);
        Assertions.assertThat(result.get(0).getMember().getId()).isEqualTo(members.get(0).getId());
        Assertions.assertThat(result.get(1).getMember().getId()).isEqualTo(members.get(1).getId());

    }

}
