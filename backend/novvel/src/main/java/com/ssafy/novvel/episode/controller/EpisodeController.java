package com.ssafy.novvel.episode.controller;

import com.ssafy.novvel.episode.dto.EpisodeContextDto;
import com.ssafy.novvel.episode.dto.EpisodePurchasedOnDto;
import com.ssafy.novvel.episode.dto.EpisodePurchasingDto;
import com.ssafy.novvel.episode.dto.EpisodeRegistDto;
import com.ssafy.novvel.episode.service.EpisodeService;
import com.ssafy.novvel.util.token.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
        EpisodeContextDto result = episodeService.getEpisodeInfo(episodeId, customUserDetails.getMember());
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

    @PostMapping("/purchasing")
    public ResponseEntity<?> purchaseEpisode(@RequestBody EpisodePurchasingDto episodePurchasingDto,
                                             @AuthenticationPrincipal CustomUserDetails customUserDetails){
        Integer statusCode = episodeService.purchaseEpisode(episodePurchasingDto, customUserDetails.getMember());
        return new ResponseEntity<>(HttpStatus.valueOf(statusCode));
    }

    @GetMapping("/purchased-on")
    public ResponseEntity<Page<EpisodePurchasedOnDto>> getPurchasedEp(@AuthenticationPrincipal CustomUserDetails customUserDetails,
                                                                      Pageable pageable) {
        Page<EpisodePurchasedOnDto> episodePurchasedOnPage = episodeService.getPurchasedOnEp(customUserDetails
                .getMember(), pageable);

        return new ResponseEntity<>(episodePurchasedOnPage, HttpStatus.OK);
    }
}
