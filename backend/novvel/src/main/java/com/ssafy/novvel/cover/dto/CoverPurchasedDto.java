package com.ssafy.novvel.cover.dto;

import com.ssafy.novvel.cover.entity.Cover;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CoverPurchasedDto {
    private Long id;
    private String title;
    private String thumbnail;
    private String genre;
    private CoverWriter writer;

    public CoverPurchasedDto(Cover cover, String thumbnail, String genre,
        Long memberId, String memberNickname) {
        this.id = cover.getId();
        this.title = cover.getTitle();
        this.thumbnail = thumbnail;
        this.genre = genre;
        this.writer = new CoverWriter(memberId, memberNickname);
    }
}
