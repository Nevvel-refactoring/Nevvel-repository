package com.ssafy.novvel.cover.dto;

import com.ssafy.novvel.cover.entity.CoverStatusType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CoverModifyDto {

    @NotNull
    private String title;

    @Size(max = 500)
    private String description;

    @NotNull
    private Long genre;

    @NotNull
    private CoverStatusType status;

    Boolean isDefaultImage;
}
