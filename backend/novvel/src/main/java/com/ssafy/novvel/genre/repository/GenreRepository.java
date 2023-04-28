package com.ssafy.novvel.genre.repository;

import com.ssafy.novvel.genre.entity.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreRepository extends JpaRepository<Genre, Long> {

}
