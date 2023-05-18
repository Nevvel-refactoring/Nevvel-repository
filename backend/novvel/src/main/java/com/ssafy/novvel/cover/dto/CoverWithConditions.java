package com.ssafy.novvel.cover.dto;

import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.novvel.cover.entity.Cover;
import com.ssafy.novvel.cover.entity.CoverStatusType;
import com.ssafy.novvel.genre.dto.GenreDto;
import com.ssafy.novvel.genre.entity.Genre;
import java.time.LocalDate;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class CoverWithConditions {

    private Long id;
    private String title;
    private CoverStatusType status;
    private String thumbnail;
    private String genre;
    private CoverWriter writer;
    private Boolean isUploaded;
    private Boolean isNew;
    private Long views;
    private Long likes;

    @Builder
    public CoverWithConditions(Long id, String title,
        CoverStatusType status, String thumbnail, Long views, Genre genre, Long writerId,
        String writerNickname, Boolean isUploaded, Boolean isNew, Long likes) {
        this.id = id;
        this.title = title;
        this.status = status;
        this.thumbnail = thumbnail;
        this.genre = genre.getName();
        this.views = views;
        this.writer = new CoverWriter(writerId, writerNickname);
        this.isUploaded = isUploaded;
        this.isNew = isNew;
        this.likes = likes;
    }
}
