package com.ssafy.novvel.cover.dto;

import java.util.List;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Setter
@Builder
public class CoverInfoAndEpisodesDto {

    @NotNull
    private String title;
    @Size(max = 500)
    private String description;
    @NotNull
    private String genreName;

    private List<EpisodeInfoDto> episodes;
}
