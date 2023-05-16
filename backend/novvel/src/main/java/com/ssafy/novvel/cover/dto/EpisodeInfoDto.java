package com.ssafy.novvel.cover.dto;

import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.novvel.transactionhistory.entity.PointChangeType;
import java.time.LocalDateTime;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class EpisodeInfoDto {

    @NotNull
    private Long id;

    private String title;

    @PositiveOrZero
    private Long point;

    @PositiveOrZero
    private Long views;

    private LocalDateTime uploadedDateTime;

    private Boolean isPurchased;
    private Boolean isRead;

    @QueryProjection
    public EpisodeInfoDto(Long id, String title, Long point, Long viewCount, LocalDateTime publishedDate,
        PointChangeType pointChangeType, Boolean isRead) {
        this.id = id;
        this.point = point;
        this.views = viewCount;
        this.title = title;
        this.uploadedDateTime = publishedDate;
        this.isPurchased = PointChangeType.BUY_EPISODE.equals(pointChangeType);
        this.isRead = isRead;
    }

    @QueryProjection
    public EpisodeInfoDto(Long id, String title, Long point, Long viewCount, LocalDateTime localDateTime) {
        this.id = id;
        this.point = point;
        this.views = viewCount;
        this.title = title;
        this.uploadedDateTime = localDateTime;
        this.isPurchased = false;
        this.isRead = false;
    }
}
