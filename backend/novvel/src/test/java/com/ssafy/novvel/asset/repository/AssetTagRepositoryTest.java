package com.ssafy.novvel.asset.repository;

import com.ssafy.novvel.asset.entity.Asset;
import com.ssafy.novvel.asset.entity.AssetTag;
import com.ssafy.novvel.asset.entity.AssetType;
import com.ssafy.novvel.asset.entity.Tag;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import java.util.List;

@DataJpaTest
public class AssetTagRepositoryTest {

    @Autowired
    private AssetTagRepository assetTagRepository;
    @Autowired
    private AssetRepository assetRepository;
    @Autowired
    private TagRepository tagRepository;

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
        Page<Asset> result = assetTagRepository.findByTagIn(List.of(savedTag), pageable);


        Assertions.assertThat(result.getContent().get(0).getDescription()).isEqualTo("descr");

    }
}
