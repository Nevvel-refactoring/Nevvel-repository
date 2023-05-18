package com.ssafy.novvel.asset.dto;

import com.ssafy.novvel.asset.entity.AssetType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
public class AssetSearchReqKeywordTagDto {
    private String keyword;
    private List<String> tags;
    private AssetType assetType;

}
