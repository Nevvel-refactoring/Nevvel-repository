package com.ssafy.novvel.episode.controller;

import com.ssafy.novvel.episode.dto.EpisodeContextDto;
import com.ssafy.novvel.episode.dto.EpisodeRegistDto;
import com.ssafy.novvel.context.repository.ContextRepository;
import com.ssafy.novvel.episode.repository.EpisodeRepository;
import com.ssafy.novvel.episode.service.EpisodeService;
import com.ssafy.novvel.util.token.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/episodes")
@RequiredArgsConstructor
public class EpisodeController {

    private final EpisodeService episodeService;

    @PostMapping
    public ResponseEntity<Long> registEpisode(@RequestBody EpisodeRegistDto episodeRegistDto,
                                              @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        Long result = episodeService.createEpisode(episodeRegistDto, customUserDetails.getMember());
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @GetMapping("/{episodeId}")
    public ResponseEntity<EpisodeContextDto> getEpisode(@PathVariable Long episodeId,
                                                        @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        EpisodeContextDto result = episodeService.getEpisodeInfo(episodeId, customUserDetails.getId());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @DeleteMapping("/{episodeId}")
    public ResponseEntity<?> deleteEpisode(@PathVariable Long episodeId,
                                                @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        episodeService.deleteEpisode(episodeId, customUserDetails.getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{episodeId}")
    public ResponseEntity<?> editEpisode(@PathVariable Long episodeId,
                                              @RequestBody EpisodeRegistDto episodeRegistDto,
                                              @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        episodeService.updateEpisode(episodeId, episodeRegistDto, customUserDetails.getMember());
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
