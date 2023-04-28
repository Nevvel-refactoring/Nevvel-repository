package com.ssafy.novvel.episode.dto;

import com.ssafy.novvel.context.dto.ContextTouchsDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class EpisodeContextDto {
    /**
     *
     *   "contents": [
     *     {
     *       "idx": "integer",
     *       "context": "String"
     *       "isEvent": "bool",
     *       "event": [
     *         {
     *           "myAssetId": "integer",
     *           "type": "string"
     *         },
     *       ]
     *     },
     *   ]
     */
    private Long episodeId;

    private List<ContextTouchsDto> contents;
}
