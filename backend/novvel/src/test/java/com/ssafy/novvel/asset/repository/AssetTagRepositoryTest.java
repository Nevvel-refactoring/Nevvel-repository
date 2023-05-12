package com.ssafy.novvel.asset.repository;

import com.ssafy.novvel.asset.entity.Asset;
import com.ssafy.novvel.asset.entity.AssetTag;
import com.ssafy.novvel.asset.entity.AssetType;
import com.ssafy.novvel.asset.entity.Tag;
import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.member.repository.MemberRepository;
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
import org.springframework.data.domain.Slice;
import org.springframework.test.context.ActiveProfiles;

import java.util.List;

@DataJpaTest
//@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
@ActiveProfiles("test")
public class AssetTagRepositoryTest {

    @Autowired
    private AssetTagRepository assetTagRepository;
    @Autowired
    private AssetRepository assetRepository;
    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private ResourceRepository resourceRepository;

    @Test
    void findPageByTagInTest() {

        Tag tag = new Tag("tag1");
        Asset asset = Asset.builder()
                .member(null)
                .resource(null)
                .title("title")
                .description("descr")
                .type(AssetType.IMAGE)
                .point(100L)
                .build();

        Tag savedTag = tagRepository.save(tag);
        Asset savedAsset = assetRepository.save(asset);

        AssetTag assetTag = new AssetTag(savedAsset, savedTag);
        assetTagRepository.save(assetTag);

        Pageable pageable = PageRequest.of(0, 5);
        Page<Asset> result = assetTagRepository.findPageByTagIn(List.of(savedTag), pageable);


        Assertions.assertThat(result.getContent().get(0).getDescription()).isEqualTo("descr");

    }

    @Test
    void findByTagInTest() {
        Asset asset1 = new Asset("title1", AssetType.IMAGE, "desc1", 100L);
        Asset asset2 = new Asset("title2", AssetType.IMAGE, "desc1", 100L);
        Asset asset3 = new Asset("title3", AssetType.IMAGE, "desc1", 100L);

        Tag tag1 = tagRepository.save(new Tag("tag1"));
        Tag tag2 = tagRepository.save(new Tag("tag2"));
        Tag tag3 = tagRepository.save(new Tag("tag3"));
        assetRepository.saveAll(List.of(asset1, asset2, asset3));

        assetTagRepository.saveAll(
                List.of(
                        new AssetTag(asset1, tag1),
                        new AssetTag(asset1, tag2),
                        new AssetTag(asset2, tag2),
                        new AssetTag(asset3, tag3)
                ));


        Pageable pageable = PageRequest.of(0, 5);
        Slice<Asset> result = assetTagRepository.findByTagIn(List.of(tag1, tag2), pageable);
        Assertions.assertThat(result.getContent().size()).isEqualTo(2);

    }

    @Test
    void findByAssetInTest() {
        List<Resource> resources = resourceRepository.saveAll(TestUtil.getResources(4));
        List<Member> members = memberRepository.saveAll(TestUtil.getUSERMembers(4));
        List<Asset> assets = assetRepository.saveAll(TestUtil.getAssetList(4, members, resources));

        Tag tag1 = new Tag(1L, "tag1");
        Tag tag2 = new Tag(2L, "tag2");
        Tag tag3 = new Tag(3L, "tag3");
        List<Tag> tags = tagRepository.saveAll(List.of(tag1, tag2, tag3));

        List<AssetTag> assetTags = List.of(
                new AssetTag(assets.get(0), tags.get(0)),
                new AssetTag(assets.get(0), tags.get(1)),
                new AssetTag(assets.get(1), tags.get(1)),
                new AssetTag(assets.get(2), tags.get(1)),
                new AssetTag(assets.get(3), tags.get(2))
        );
        assetTags = assetTagRepository.saveAll(assetTags);
        List<AssetTag> result = assetTagRepository.findByAssetIn(assets);

        Assertions.assertThat(result.size()).isEqualTo(5);
        Assertions.assertThat(result.get(0).getTag().getTagName()).isEqualTo("tag1");
        Assertions.assertThat(result.get(1).getTag().getTagName()).isEqualTo("tag2");
        Assertions.assertThat(result.get(2).getTag().getTagName()).isEqualTo("tag2");
        Assertions.assertThat(result.get(3).getTag().getTagName()).isEqualTo("tag2");
        Assertions.assertThat(result.get(4).getTag().getTagName()).isEqualTo("tag3");

    }
}
