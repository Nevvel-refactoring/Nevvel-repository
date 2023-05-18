package com.ssafy.novvel.genre.entity;

import com.ssafy.novvel.genre.dto.GenreDto;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Genre {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Setter
    @NotNull
    private String name;

    public GenreDto toDto() {
        return new GenreDto(this.getId(), this.getName());
    }
}
