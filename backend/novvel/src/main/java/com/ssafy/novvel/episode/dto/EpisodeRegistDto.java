package com.ssafy.novvel.episode.dto;

import com.ssafy.novvel.context.dto.ContextTouchsDto;
import com.ssafy.novvel.episode.entity.EpisodeStatusType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class EpisodeRegistDto {

 @NotNull
 private Long coverId;

 @NotNull
 private Long point;

 @NotNull
 @Enumerated(EnumType.STRING)
 private EpisodeStatusType statusType;

 private List<ContextTouchsDto> contents;
}
