package com.ssafy.novvel.context.dto;

import com.ssafy.novvel.asset.entity.AssetType;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

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
    @Setter
    private String assetUrl;
    private AssetType type;

    private String effect;

}
