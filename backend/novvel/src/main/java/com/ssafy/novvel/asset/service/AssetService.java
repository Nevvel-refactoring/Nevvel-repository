package com.ssafy.novvel.asset.service;

import com.ssafy.novvel.asset.dto.AssetRegistDto;
import com.ssafy.novvel.asset.dto.AssetSearchDto;
import com.ssafy.novvel.asset.entity.Asset;
import com.ssafy.novvel.asset.entity.Tag;
import com.ssafy.novvel.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface AssetService {

    Asset addAsset(MultipartFile file, Member member, AssetRegistDto assetRegistDto) throws IOException;
    Page<AssetSearchDto> searchAssetByTag(List<Tag> tags);




}
