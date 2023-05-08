package com.ssafy.novvel.asset.repository;

import com.ssafy.novvel.asset.dto.AssetFilterDto;
import com.ssafy.novvel.asset.dto.AssetSearchDto;
import com.ssafy.novvel.asset.dto.AssetSearchReqKeywordTagDto;
import com.ssafy.novvel.asset.dto.SearchType;
import com.ssafy.novvel.asset.entity.Asset;
import com.ssafy.novvel.asset.entity.AssetTag;
import com.ssafy.novvel.asset.entity.AssetType;
import com.ssafy.novvel.asset.entity.Tag;
import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.member.repository.MemberRepository;
import com.ssafy.novvel.memberasset.entity.MemberAsset;
import com.ssafy.novvel.memberasset.repository.MemberAssetRepository;
import com.ssafy.novvel.resource.entity.Resource;
import com.ssafy.novvel.resource.repository.ResourceRepository;
import com.ssafy.novvel.util.TestUtil;
import lombok.extern.slf4j.Slf4j;
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
@ActiveProfiles("test")
@Slf4j
public class AssetReposiotryCustomTest {

    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private AssetRepository assetRepository;
    @Autowired
    private MemberAssetRepository memberAssetRepository;
    @Autowired
    private AssetTagRepository assetTagRepository;
    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private ResourceRepository resourceRepository;

    @Test
    void searchAssetSearchTypeNotPurchaseTest() {
        Member member = TestUtil.getUSERMember().get();
        member = memberRepository.save(member);
        Member searchMember = TestUtil.getTestMember();
        searchMember.setPoint(100L);
        searchMember = memberRepository.save(searchMember);
        List<Resource> resources = TestUtil.getResources(4);
        resources = resourceRepository.saveAll(resources);
        List<Asset> assets = TestUtil.getAssetList(4, member, resources);
        assets = assetRepository.saveAll(assets);
        List<Tag> tags = TestUtil.getTagList(5);
        tags = tagRepository.saveAll(tags);
        List<AssetTag> assetTags = List.of(
                new AssetTag(assets.get(0), tags.get(0)),
                new AssetTag(assets.get(0), tags.get(1)),
                new AssetTag(assets.get(1), tags.get(1)),
                new AssetTag(assets.get(2), tags.get(2)),
                new AssetTag(assets.get(3), tags.get(3)),
                new AssetTag(assets.get(3), tags.get(4))
        );
        assetTags = assetTagRepository.saveAll(assetTags);
        List<MemberAsset> memberAssets = TestUtil.getMemberAssets(searchMember, List.of(assets.get(0), assets.get(3)));
        memberAssets = memberAssetRepository.saveAll(memberAssets);

        //log
        log.info("do repository method =====================================================");
        AssetFilterDto assetFilterDto = new AssetFilterDto(AssetType.IMAGE, List.of("0", "1", "2", "4"), SearchType.NOT_PURCHASED);
        Pageable pageable = PageRequest.of(0, 5);


        Page<AssetSearchDto> assetSearchDtos = assetRepository.searchAsset(assetFilterDto, searchMember, pageable);

        for (Asset asset : assets) {
            System.out.println(asset.getTitle());
        }

        for (AssetSearchDto assetSearchDto : assetSearchDtos.getContent()) {
            System.out.println(assetSearchDto.toString());

        }
        Assertions.assertThat(assetSearchDtos.getContent().size()).isEqualTo(2);

    }


    @Test
    void searchAssetSearchTypeAllTest() {
        Member member = TestUtil.getUSERMember().get();
        member = memberRepository.save(member);
        Member searchMember = TestUtil.getTestMember();
        searchMember.setPoint(100L);
        searchMember = memberRepository.save(searchMember);
        List<Resource> resources = TestUtil.getResources(4);
        resources = resourceRepository.saveAll(resources);
        List<Asset> assets = TestUtil.getAssetList(4, member, resources);
        assets = assetRepository.saveAll(assets);
        List<Tag> tags = TestUtil.getTagList(5);
        tags = tagRepository.saveAll(tags);
        List<AssetTag> assetTags = List.of(
                new AssetTag(assets.get(0), tags.get(0)),
                new AssetTag(assets.get(0), tags.get(1)),
                new AssetTag(assets.get(1), tags.get(1)),
                new AssetTag(assets.get(2), tags.get(2)),
                new AssetTag(assets.get(3), tags.get(3)),
                new AssetTag(assets.get(3), tags.get(4))
        );
        assetTags = assetTagRepository.saveAll(assetTags);
        List<MemberAsset> memberAssets = TestUtil.getMemberAssets(searchMember, List.of(assets.get(0), assets.get(3)));
        memberAssets = memberAssetRepository.saveAll(memberAssets);


        AssetFilterDto assetFilterDto = new AssetFilterDto(AssetType.IMAGE, List.of("0", "1", "2", "4"), SearchType.ALL);
        Pageable pageable = PageRequest.of(0, 5);

        Page<AssetSearchDto> assetSearchDtos = assetRepository.searchAsset(assetFilterDto, searchMember, pageable);

        for (Asset asset : assets) {
            System.out.println(asset.getTitle());
        }

        for (AssetSearchDto assetSearchDto : assetSearchDtos.getContent()) {
            System.out.println(assetSearchDto.toString());

        }
        Assertions.assertThat(assetSearchDtos.getContent().size()).isEqualTo(4);

    }

    @Test
    void searchAssetByKeywordAndTagsAllTest() {
        Member member = TestUtil.getUSERMember().get();
        member = memberRepository.save(member);
        Member searchMember = TestUtil.getTestMember();
        searchMember.setPoint(100L);
        searchMember = memberRepository.save(searchMember);
        List<Resource> resources = TestUtil.getResources(4);
        resources = resourceRepository.saveAll(resources);
        List<Asset> assets = TestUtil.getAssetList(4, member, resources);
        assets = assetRepository.saveAll(assets);
        List<Tag> tags = TestUtil.getTagList(5);
        tags = tagRepository.saveAll(tags);
        List<AssetTag> assetTags = List.of(
                new AssetTag(assets.get(0), tags.get(0)),
                new AssetTag(assets.get(0), tags.get(1)),
                new AssetTag(assets.get(1), tags.get(1)),
                new AssetTag(assets.get(2), tags.get(2)),
                new AssetTag(assets.get(3), tags.get(3)),
                new AssetTag(assets.get(3), tags.get(4))
        );
        assetTags = assetTagRepository.saveAll(assetTags);
        List<MemberAsset> memberAssets = TestUtil.getMemberAssets(searchMember, List.of(assets.get(0), assets.get(3)));
        memberAssets = memberAssetRepository.saveAll(memberAssets);


        AssetSearchReqKeywordTagDto reqKeywordTagDto = new AssetSearchReqKeywordTagDto("0title", List.of("0", "1", "2", "4"), AssetType.IMAGE);
        Pageable pageable = PageRequest.of(0, 5);

        Page<AssetSearchDto> assetSearchDtos = assetRepository.searchAssetByKeywordAndTags(reqKeywordTagDto, searchMember, pageable);

        for (Asset asset : assets) {
            System.out.println(asset.getTitle());
        }

        for (AssetSearchDto assetSearchDto : assetSearchDtos.getContent()) {
            System.out.println(assetSearchDto.toString());

        }
        Assertions.assertThat(assetSearchDtos.getContent().size()).isEqualTo(1);

    }

    @Test
    void searchAssetByKeywordAndTagsTestByKeyword() {
        Member member = TestUtil.getUSERMember().get();
        member = memberRepository.save(member);
        Member searchMember = TestUtil.getTestMember();
        searchMember.setPoint(100L);
        searchMember = memberRepository.save(searchMember);
        List<Resource> resources = TestUtil.getResources(4);
        resources = resourceRepository.saveAll(resources);
        List<Asset> assets = TestUtil.getAssetList(4, member, resources);
        assets = assetRepository.saveAll(assets);
        List<Tag> tags = TestUtil.getTagList(5);
        tags = tagRepository.saveAll(tags);
        List<AssetTag> assetTags = List.of(
                new AssetTag(assets.get(0), tags.get(0)),
                new AssetTag(assets.get(0), tags.get(1)),
                new AssetTag(assets.get(1), tags.get(1)),
                new AssetTag(assets.get(2), tags.get(2)),
                new AssetTag(assets.get(3), tags.get(3)),
                new AssetTag(assets.get(3), tags.get(4))
        );
        assetTags = assetTagRepository.saveAll(assetTags);
        List<MemberAsset> memberAssets = TestUtil.getMemberAssets(searchMember, List.of(assets.get(0), assets.get(3)));
        memberAssets = memberAssetRepository.saveAll(memberAssets);


        AssetSearchReqKeywordTagDto reqKeywordTagDto = new AssetSearchReqKeywordTagDto("0title", null, AssetType.IMAGE);
        Pageable pageable = PageRequest.of(0, 5);

        Page<AssetSearchDto> assetSearchDtos = assetRepository.searchAssetByKeywordAndTags(reqKeywordTagDto, searchMember, pageable);

        for (Asset asset : assets) {
            System.out.println(asset.getTitle());
        }

        for (AssetSearchDto assetSearchDto : assetSearchDtos.getContent()) {
            System.out.println(assetSearchDto.toString());

        }
        Assertions.assertThat(assetSearchDtos.getContent().size()).isEqualTo(1);

    }

    @Test
    void searchAssetByKeywordAndTagsTestByTags() {
        Member member = TestUtil.getUSERMember().get();
        member = memberRepository.save(member);
        Member searchMember = TestUtil.getTestMember();
        searchMember.setPoint(100L);
        searchMember = memberRepository.save(searchMember);
        List<Resource> resources = TestUtil.getResources(4);
        resources = resourceRepository.saveAll(resources);
        List<Asset> assets = TestUtil.getAssetList(4, member, resources);
        assets = assetRepository.saveAll(assets);
        List<Tag> tags = TestUtil.getTagList(5);
        tags = tagRepository.saveAll(tags);
        List<AssetTag> assetTags = List.of(
                new AssetTag(assets.get(0), tags.get(0)),
                new AssetTag(assets.get(0), tags.get(1)),
                new AssetTag(assets.get(1), tags.get(1)),
                new AssetTag(assets.get(2), tags.get(2)),
                new AssetTag(assets.get(3), tags.get(3)),
                new AssetTag(assets.get(3), tags.get(4))
        );
        assetTags = assetTagRepository.saveAll(assetTags);
        List<MemberAsset> memberAssets = TestUtil.getMemberAssets(searchMember, List.of(assets.get(0), assets.get(3)));
        memberAssets = memberAssetRepository.saveAll(memberAssets);


        AssetSearchReqKeywordTagDto reqKeywordTagDto = new AssetSearchReqKeywordTagDto(null, List.of("0", "1", "4"), AssetType.IMAGE);
        Pageable pageable = PageRequest.of(0, 5);

        Page<AssetSearchDto> assetSearchDtos = assetRepository.searchAssetByKeywordAndTags(reqKeywordTagDto, searchMember, pageable);

        for (Asset asset : assets) {
            System.out.println(asset.getTitle());
        }

        for (AssetSearchDto assetSearchDto : assetSearchDtos.getContent()) {
            System.out.println(assetSearchDto.toString());

        }
        Assertions.assertThat(assetSearchDtos.getContent().size()).isEqualTo(3);

    }

}
