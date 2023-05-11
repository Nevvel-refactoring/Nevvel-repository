package com.ssafy.novvel.episode.entity;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import com.ssafy.novvel.context.entity.Context;
import com.ssafy.novvel.cover.entity.Cover;
import com.ssafy.novvel.episode.dto.EpisodeRegistDto;
import com.ssafy.novvel.util.BaseEntity;
import javax.persistence.FetchType;
import javax.persistence.ManyToOne;
import javax.validation.constraints.PositiveOrZero;
import lombok.*;
import org.bson.types.ObjectId;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

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

    @Setter
    @NotNull
    private String title;

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

    @Setter
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime reservationTime;

    @Setter
    @JsonSerialize(using = LocalDateTimeSerializer.class)
    @JsonDeserialize(using = LocalDateTimeDeserializer.class)
    private LocalDateTime publishedDate;

    @Transient
    private Context context;

    @Setter
    private ObjectId contextId;

    public Episode(Cover cover, EpisodeRegistDto episodeRegistDto, ObjectId contextId) {
//    public Episode(EpisodeRegistDto episodeRegistDto, ObjectId contextId) {
        this.cover = cover;
        this.title = episodeRegistDto.getTitle();
        this.statusType = episodeRegistDto.getStatusType();
        this.point = episodeRegistDto.getPoint();
        this.viewCount = 0L;
        this.contextId = contextId;
    }

    public Episode(Cover cover, EpisodeRegistDto episodeRegistDto, LocalDateTime time, ObjectId contextId) {
//    public Episode(EpisodeRegistDto episodeRegistDto, ObjectId contextId) {
        this.cover = cover;
        this.title = episodeRegistDto.getTitle();
        this.statusType = episodeRegistDto.getStatusType();
        this.point = episodeRegistDto.getPoint();
        this.viewCount = 0L;
        this.reservationTime = time;
        this.contextId = contextId;
    }

}
