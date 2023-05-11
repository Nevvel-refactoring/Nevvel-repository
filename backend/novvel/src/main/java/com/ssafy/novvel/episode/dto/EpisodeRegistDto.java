package com.ssafy.novvel.episode.dto;

import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;
import com.ssafy.novvel.context.dto.ContextTouchsDto;
import com.ssafy.novvel.episode.entity.EpisodeStatusType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EpisodeRegistDto {

 @NotNull
 private Long coverId;

 @NotNull
 private String title;

 @NotNull
 private Long point;

 @NotNull
 @Enumerated(EnumType.STRING)
 private EpisodeStatusType statusType;

 private boolean reservation;

 @JsonSerialize(using = LocalDateTimeSerializer.class)
 @JsonDeserialize(using = LocalDateTimeDeserializer.class)
 private LocalDateTime reservationTime;

 private List<ContextTouchsDto> contents;
}
