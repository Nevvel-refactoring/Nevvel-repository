package com.ssafy.novvel.episode.entity;

import com.ssafy.novvel.context.dto.ContextTouchsDto;
import com.ssafy.novvel.context.entity.Context;
import com.ssafy.novvel.cover.entity.Cover;
import com.ssafy.novvel.episode.dto.EpisodeRegistDto;
import com.ssafy.novvel.util.BaseEntity;
import lombok.*;
import org.bson.types.ObjectId;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Episode extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Setter
    @NotNull
    @ManyToOne(fetch = FetchType.LAZY)
    private Cover cover;

    @Enumerated(EnumType.STRING)
    @Setter
    @NotNull
    private EpisodeStatusType statusType;

    @Setter
    @NotNull
    @PositiveOrZero
    private Long point;

    @Setter
    @NotNull
    @PositiveOrZero
    private Long viewCount;

    @Transient
    private Context context;

    @Setter
    private ObjectId contextId;

    public Episode(Cover cover, EpisodeRegistDto episodeRegistDto, ObjectId contextId) {
//    public Episode(EpisodeRegistDto episodeRegistDto, ObjectId contextId) {
        this.cover = cover;
        this.statusType = episodeRegistDto.getStatusType();
        this.point = episodeRegistDto.getPoint();
        this.viewCount = 0L;
        this.contextId = contextId;
    }

}
