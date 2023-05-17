package com.ssafy.novvel.cover.dto;

import com.ssafy.novvel.cover.entity.CoverStatusType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class CoverModifyDto {

    @NotNull
    private String title;

    @Size(max = 500)
    private String description;

    @NotNull
    private Long genreId;

    @NotNull
    private CoverStatusType coverStatusType;

    private Boolean isDefaultImage;

}
