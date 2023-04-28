package com.ssafy.novvel.context.dto;

import com.ssafy.novvel.asset.entity.AssetType;
import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class ContextAffectInfoDto {
    /**
     * {
     *       "assetId": "integer",
     *       "type": "string",
     *       "effect": "string",
     *  },
     *
     */
    private Long assetId;

    private AssetType type;

    private String effect;

}
