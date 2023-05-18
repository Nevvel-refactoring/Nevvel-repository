package com.ssafy.novvel.genre.dto;


import com.ssafy.novvel.genre.entity.Genre;
import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GenreDto {

    @NotNull
    private Long id;

    @NotNull
    private String name;
}
