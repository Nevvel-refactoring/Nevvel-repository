package com.ssafy.novvel.episode.controller;

import com.ssafy.novvel.episode.entity.Episode;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping
public class EpisodeController {

    @PostMapping("/episodes")
    public String createEpisode() {

        return null;
    }

    @GetMapping("/episodes/{episodeID}")
    public String getEpisode() {

        return null;
    }

    @DeleteMapping("/episodes/{episodeID}")
    public String deleteEpisode() {

        return null;
    }

    @PutMapping("/episodes/{episodeID}")
    public String editEpisode() {

        return null;
    }
}
