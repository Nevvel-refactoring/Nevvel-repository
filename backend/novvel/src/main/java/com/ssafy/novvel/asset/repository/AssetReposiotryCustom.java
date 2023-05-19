package com.ssafy.novvel.asset.repository;

import com.ssafy.novvel.asset.dto.AssetFilterDto;
import com.ssafy.novvel.asset.dto.AssetSearchDto;
import com.ssafy.novvel.asset.dto.AssetSearchReqKeywordTagDto;
import com.ssafy.novvel.asset.entity.AssetType;
import com.ssafy.novvel.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;


public interface AssetReposiotryCustom {

    Page<AssetSearchDto> searchAsset(AssetFilterDto assetFilterDto, Member member, Pageable pageable);
    Page<AssetSearchDto> searchAssetByKeywordAndTags(AssetSearchReqKeywordTagDto reqKeywordTagDto, Member member, Pageable pageable);

    Page<AssetSearchDto> searchOwnAssets(AssetType assetType, Member member, Pageable pageable);
}
