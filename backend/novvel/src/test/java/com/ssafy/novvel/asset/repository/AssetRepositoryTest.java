package com.ssafy.novvel.asset.repository;

import com.ssafy.novvel.asset.repository.AssetRepository;
import com.ssafy.novvel.asset.repository.AssetTagRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

@DataJpaTest
public class AssetRepositoryTest {
    @Autowired
    private AssetRepository assetRepository;

    @Test
    void findByTagInTest(){




    }

}
