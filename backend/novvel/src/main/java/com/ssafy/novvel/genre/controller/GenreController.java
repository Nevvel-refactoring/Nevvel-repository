package com.ssafy.novvel.genre.controller;

import com.ssafy.novvel.genre.dto.GenreDto;
import com.ssafy.novvel.genre.service.GenreService;
import java.util.List;

import io.swagger.v3.oas.annotations.Operation;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/genre")
public class GenreController {

    private final GenreService genreService;

    public GenreController(GenreService genreService) {
        this.genreService = genreService;
    }

    @GetMapping()
    @Operation(summary = "장르 목록", description = "<strong>장르를 반환</strong> 합니다.")
    public ResponseEntity<List<GenreDto>> getGenre() {

        return new ResponseEntity<>(genreService.getAllGenre(), HttpStatus.OK);
    }
}
