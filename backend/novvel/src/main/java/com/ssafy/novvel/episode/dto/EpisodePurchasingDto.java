package com.ssafy.novvel.episode.dto;

import lombok.Getter;

import java.util.List;

@Getter
public class EpisodePurchasingDto {
    /**
     * {
     *   "coverId": "integer",
     *   "episodes": [
     *     {
     *       "id": "integer"
     *     }
     *   ]
     * }
     */
    private Long coverId;

    private List<EpisodeIdsDto> episodes;
}
