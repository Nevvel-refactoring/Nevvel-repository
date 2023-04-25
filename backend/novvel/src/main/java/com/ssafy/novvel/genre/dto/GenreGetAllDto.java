package com.ssafy.novvel.genre.dto;


import javax.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GenreGetAllDto {

    @NotNull
    private Long id;

    @NotNull
    private String name;
}
