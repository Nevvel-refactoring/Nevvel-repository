package com.ssafy.novvel.cover.dto;

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
    private final Long id;

    @PositiveOrZero
    private final Long point;

    @PositiveOrZero
    private Long viewCount;

    private final LocalDateTime uploadedDateTime;

    private final Boolean isPurchased;
    private final Boolean isRead;

    public EpisodeInfoDto(Long id, Long point, Long viewCount, LocalDateTime localDateTime,
        PointChangeType pointChangeType, Boolean isRead) {
        this.id = id;
        this.point = point;
        this.viewCount = viewCount;
        this.uploadedDateTime = localDateTime;
        this.isPurchased = PointChangeType.BUY_EPISODE.equals(pointChangeType);
        this.isRead = isRead;
    }
}
