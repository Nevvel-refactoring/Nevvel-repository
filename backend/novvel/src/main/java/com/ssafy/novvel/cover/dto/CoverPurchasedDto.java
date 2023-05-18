package com.ssafy.novvel.cover.dto;

import com.ssafy.novvel.cover.entity.Cover;
import com.ssafy.novvel.genre.dto.GenreDto;
import com.ssafy.novvel.genre.entity.Genre;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CoverPurchasedDto {
    private Long id;
    private String title;
    private String thumbnail;
    private String genre;
    private CoverWriter writer;
    private Long views;
    private Long likes;

    public CoverPurchasedDto(Cover cover, String thumbnail, Genre genre,
        Long memberId, String memberNickname) {
        this.id = cover.getId();
        this.title = cover.getTitle();
        this.thumbnail = thumbnail;
        this.genre = genre.getName();
        this.writer = new CoverWriter(memberId, memberNickname);
        this.views = cover.getViewCount();
        this.likes = cover.getLikes();
    }
}
