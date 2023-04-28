package com.ssafy.novvel.cover.dto;

import com.ssafy.novvel.genre.dto.GenreDto;
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
public class CoverRegisterDto {

    @NotNull
    private String title;
    @Size(max = 500)
    private String description;
    @NotNull
    private Long genreId;

}
