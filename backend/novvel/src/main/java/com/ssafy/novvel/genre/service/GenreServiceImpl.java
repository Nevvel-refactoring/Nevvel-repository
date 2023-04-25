package com.ssafy.novvel.genre.service;

import com.ssafy.novvel.genre.dto.GenreGetAllDto;
import com.ssafy.novvel.genre.repository.GenreRepository;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Service;

@Service
public class GenreServiceImpl implements GenreService {

    private final GenreRepository genreRepository;

    public GenreServiceImpl(GenreRepository genreRepository) {
        this.genreRepository = genreRepository;
    }

    @Override
    public List<GenreGetAllDto> getAllGenre() {
        return genreRepository.findAll().stream()
            .map(genre -> new GenreGetAllDto(genre.getId(), genre.getName()))
            .collect(Collectors.toList());
    }
}
