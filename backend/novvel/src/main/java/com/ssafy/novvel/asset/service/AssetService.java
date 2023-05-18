package com.ssafy.novvel.asset.service;

import com.ssafy.novvel.asset.dto.AssetFilterDto;
import com.ssafy.novvel.asset.dto.AssetRegistDto;
import com.ssafy.novvel.asset.dto.AssetSearchDto;
import com.ssafy.novvel.asset.dto.AssetSearchReqKeywordTagDto;
import com.ssafy.novvel.asset.entity.Asset;
import com.ssafy.novvel.asset.entity.AssetType;
import com.ssafy.novvel.asset.entity.Tag;
import com.ssafy.novvel.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.List;

public interface AssetService {

    Asset addAsset(MultipartFile file, Member member, AssetRegistDto assetRegistDto) throws IOException;

    Asset updateAsset(Long id, Member member, AssetRegistDto assetRegistDto);

    Slice<AssetSearchDto> searchAssetByTag(List<String> tags, Pageable pageable, Member member);


    Integer purchaseAsset(Long assetId, Member member);

    Page<AssetSearchDto> searchAsset(AssetFilterDto assetFilterDto, Member member, Pageable pageable);
    Page<AssetSearchDto> searchAssetByKeywordAndTags(AssetSearchReqKeywordTagDto assetSearchReqKeywordTagDto, Member member, Pageable pageable);

    Page<AssetSearchDto> searchAssetByUploader(Long uploaderId, Member member, AssetType assetType, Pageable pageable);

    Page<Tag> findPageTags(Pageable pageable);

    Page<AssetSearchDto> searchMyAssets(AssetType assetType, Member member, Pageable pageable);


}
