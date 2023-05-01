package com.ssafy.novvel.asset.repository;

import com.ssafy.novvel.asset.entity.Asset;
import com.ssafy.novvel.asset.entity.AssetTag;
import com.ssafy.novvel.asset.entity.Tag;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssetTagRepository extends JpaRepository<AssetTag, Long> {

    @Query("SELECT DISTINCT at.asset FROM AssetTag at WHERE at.tag in (:tags)")
    Page<Asset> findPageByTagIn(@Param(value = "tags") List<Tag> tags, Pageable pageable);

    @Query("SELECT DISTINCT at.asset  FROM AssetTag at  WHERE at.tag in (:tags)")
    Slice<Asset> findByTagIn(@Param(value = "tags") List<Tag> tags, Pageable pageable);

    @Query("SELECT at FROM AssetTag at LEFT JOIN FETCH at.tag WHERE at.asset in (:assets)")
    List<AssetTag> findByAssetIn(@Param(value = "assets")List<Asset> assets);

    @Query("SELECT DISTINCT at.asset FROM AssetTag at WHERE at.tag in (:tags)")
    List<Asset> findByTagIn(@Param(value = "tags") List<Tag> tags);
//    @Query("SELECT DISTINCT at.asset FROM AssetTag at WHERE at.tag.id IN (:tags)")
//    List<Asset> findByTagIn(@Param(value = "tags") List<Long> tags);
}
