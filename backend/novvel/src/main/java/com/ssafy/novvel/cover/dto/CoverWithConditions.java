package com.ssafy.novvel.cover.dto;

import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.novvel.cover.entity.Cover;
import com.ssafy.novvel.cover.entity.CoverStatusType;
import com.ssafy.novvel.cover.util.DefaultImage;
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

    @Builder
    public CoverWithConditions(Long id, String title,
        CoverStatusType status, String thumbnail, String genre, Long writerId,
        String writerNickname, Boolean isUploaded, Boolean isNew) {
        this.id = id;
        this.title = title;
        this.status = status;
        this.thumbnail = checkThumbnail(thumbnail, genre);
        this.genre = genre;
        this.writer = new CoverWriter(writerId, writerNickname);
        this.isUploaded = isUploaded;
        this.isNew = isNew;
    }

    @Builder
    @QueryProjection
    public CoverWithConditions(Cover cover) {
        this.id = cover.getId();
        this.title = cover.getTitle();
        this.status = cover.getCoverStatusType();
        this.thumbnail = checkThumbnail(cover.getResource().getThumbnailUrl(),
            cover.getGenre().getName());
        this.genre = cover.getGenre().getName();
        this.writer = new CoverWriter(cover.getMember().getId(), cover.getMember().getNickname());
        if (cover.getLastPublishDate() == null) {
            this.isUploaded = false;
        } else {
            this.isUploaded = cover.getLastPublishDate().isAfter(LocalDate.now().minusDays(7L));
        }
        if (cover.getFirstPublishDate() == null) {
            this.isNew = false;
        } else {
            this.isNew = cover.getFirstPublishDate().isAfter(LocalDate.now().minusDays(7L));
        }
    }

    private String checkThumbnail(String thumbnail, String genreName) {
        return thumbnail == null ? new DefaultImage().getImageByGenreName(genreName) : thumbnail;
    }
}
