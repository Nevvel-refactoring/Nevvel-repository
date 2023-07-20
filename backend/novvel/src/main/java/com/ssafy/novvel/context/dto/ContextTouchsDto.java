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
     *       "idx": "string",
     *       "context": [
     *          {
     *              "tag": "string",
     *              "text": "string"
     *          }
     *       "event": [
     *         {
     *           "assetId": "integer",
     *           "type": "string",
     *           "effect": "string",
     *         },
     *       ]
     *     },
     *   ]
     */
    private String idx;

    private ContextDto context;

    private List<ContextAffectInfoDto> event;

}
