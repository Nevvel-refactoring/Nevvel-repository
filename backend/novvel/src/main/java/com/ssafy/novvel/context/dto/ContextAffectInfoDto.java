package com.ssafy.novvel.context.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class ContextAffectInfoDto {
    /**
     * {
     *       "myAssetId": "integer",
     *       "type": "string",
     *       "effect": "string",
     *  },
     *
     */
    private Long assetId;

    private String type;

    private String effect;

}
