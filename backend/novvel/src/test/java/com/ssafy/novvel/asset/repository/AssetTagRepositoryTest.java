package com.ssafy.novvel.asset.repository;

import com.ssafy.novvel.asset.entity.Asset;
import com.ssafy.novvel.asset.entity.AssetTag;
import com.ssafy.novvel.asset.entity.AssetType;
import com.ssafy.novvel.asset.entity.Tag;
import com.ssafy.novvel.resource.repository.ResourceRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;

import java.util.List;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class AssetTagRepositoryTest {

    @Autowired
    private AssetTagRepository assetTagRepository;
    @Autowired
    private AssetRepository assetRepository;
    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private ResourceRepository resourceRepository;

    @Test
    void findByTagInTest() {

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
    void findSliceByTagInTest() {
        Asset asset1 = new Asset("title1", AssetType.IMAGE,"desc1", 100L);
        Asset asset2 = new Asset("title2", AssetType.IMAGE,"desc1", 100L);
        Asset asset3 = new Asset("title3", AssetType.IMAGE,"desc1", 100L);

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
}
