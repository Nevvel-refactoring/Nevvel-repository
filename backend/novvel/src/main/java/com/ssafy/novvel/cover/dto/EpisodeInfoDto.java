package com.ssafy.novvel.cover.dto;

import com.querydsl.core.annotations.QueryProjection;
import com.ssafy.novvel.transactionhistory.entity.PointChangeType;
import java.time.LocalDateTime;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
public class EpisodeInfoDto {

    @NotNull
    private Long id;

    @PositiveOrZero
    private Long point;

    @PositiveOrZero
    private Long viewCount;

    private LocalDateTime uploadedDateTime;

    private Boolean isPurchased;
    private Boolean isRead;

    @QueryProjection
    public EpisodeInfoDto(Long id, Long point, Long viewCount, LocalDateTime localDateTime,
        PointChangeType pointChangeType, Boolean isRead) {
        this.id = id;
        this.point = point;
        this.viewCount = viewCount;
        this.uploadedDateTime = localDateTime;
        this.isPurchased = PointChangeType.BUY_EPISODE.equals(pointChangeType);
        this.isRead = isRead;
    }

    @QueryProjection
    public EpisodeInfoDto(Long id, Long point, Long viewCount, LocalDateTime localDateTime) {
        this.id = id;
        this.point = point;
        this.viewCount = viewCount;
        this.uploadedDateTime = localDateTime;
    }
}
