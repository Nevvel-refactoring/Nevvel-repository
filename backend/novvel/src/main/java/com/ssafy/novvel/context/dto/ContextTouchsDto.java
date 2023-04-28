package com.ssafy.novvel.context.dto;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Builder
@Getter
public class ContextTouchsDto {
    /**
     *   "contents": [
     *     {
     *       "idx": "integer",
     *       "context": "String"
     *       "isEvent": "bool",
     *       "event": [
     *         {
     *           "myAssetId": "integer",
     *           "type": "string",
     *           "effect": "string",
     *         },
     *       ]
     *     },
     *   ]
     */
    private Long idx;

    private String context;

    private Boolean isEvent;

    private List<ContextAffectInfoDto> event;

}
