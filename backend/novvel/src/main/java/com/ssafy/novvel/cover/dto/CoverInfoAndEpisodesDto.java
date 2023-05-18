package com.ssafy.novvel.cover.dto;

import com.ssafy.novvel.genre.dto.GenreDto;
import com.ssafy.novvel.genre.entity.Genre;
import com.ssafy.novvel.member.entity.Member;
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
    private GenreDto genre;

    private String thumbnail;
    private CoverWriter writer;

    private Long lastReadEpisodeId;

    private List<EpisodeInfoDto> episodes;

    private Long views;
    private Long likes;

    private Boolean isLiked;
}
