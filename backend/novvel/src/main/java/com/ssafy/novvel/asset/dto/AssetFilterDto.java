package com.ssafy.novvel.asset.dto;

import com.ssafy.novvel.asset.entity.AssetType;
import lombok.*;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class AssetFilterDto {
    private AssetType assettype;
    private List<String> tags;
    private SearchType searchtype;

}
