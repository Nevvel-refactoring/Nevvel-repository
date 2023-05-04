package com.ssafy.novvel.episode.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class EpisodePurchasedOnDto {

    private Long coverId;

    private String coverTitle;

    private Long episodeId;

    private String episodeTitle;

    private Long episodePoint;
}
