package com.ssafy.novvel.genre.service;

import com.ssafy.novvel.genre.dto.GenreDto;
import com.ssafy.novvel.genre.entity.Genre;
import com.ssafy.novvel.genre.repository.GenreRepository;
import java.util.ArrayList;
import java.util.List;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class GenreServiceImplTest {

    @InjectMocks
    GenreServiceImpl genreService;

    @Mock
    GenreRepository genreRepository;

    @Test
    void getAllGenre() {

        // given
        List<Genre> genreList = new ArrayList<>();
        genreList.add(new Genre(1L, "name1"));
        genreList.add(new Genre(2L, "name2"));

        List<GenreDto> expect = new ArrayList<>();
        expect.add(new GenreDto(1L, "name1"));
        expect.add(new GenreDto(2L, "name2"));

        Mockito.doReturn(genreList).when(genreRepository).findAll();
        List<GenreDto> result = genreService.getAllGenre();

        Assertions.assertThat(result.getClass()).isEqualTo(expect.getClass());
        Assertions.assertThat(result.get(0).getId()).isEqualTo(expect.get(0).getId());
    }
}