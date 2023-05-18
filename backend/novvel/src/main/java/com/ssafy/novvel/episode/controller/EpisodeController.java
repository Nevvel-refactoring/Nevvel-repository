package com.ssafy.novvel.episode.controller;

import com.ssafy.novvel.episode.dto.EpisodeContextDto;
import com.ssafy.novvel.episode.dto.EpisodePurchasedOnDto;
import com.ssafy.novvel.episode.dto.EpisodePurchasingDto;
import com.ssafy.novvel.episode.dto.EpisodeRegistDto;
import com.ssafy.novvel.episode.service.EpisodeService;
import com.ssafy.novvel.util.token.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
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
    @Operation(summary = "에피소드 등록", description = "에피소드를 <strong>등록</strong> 합니다.")
    public ResponseEntity<Long> registEpisode(@RequestBody EpisodeRegistDto episodeRegistDto,
                                              @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        Long result = episodeService.createEpisode(episodeRegistDto, customUserDetails.getMember());
        return new ResponseEntity<>(result, HttpStatus.CREATED);
    }

    @GetMapping("/{episodeId}")
    @Operation(summary = "에피소드 조회", description = "<strong>id의 에피소드를 조회</strong> 합니다.")
    public ResponseEntity<EpisodeContextDto> getEpisode(@PathVariable Long episodeId,
                                                        @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        EpisodeContextDto result = episodeService.getEpisodeInfo(episodeId, customUserDetails.getMember());
        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @DeleteMapping("/{episodeId}")
    @Operation(summary = "에피소드 삭제", description = "<strong>DB에서 삭제! status를 삭제로 바꾸는 건 update로 하세요</strong>")
    public ResponseEntity<?> deleteEpisode(@PathVariable Long episodeId,
                                           @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        episodeService.deleteEpisode(episodeId, customUserDetails.getId());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{episodeId}")
    @Operation(summary = "에피소드 수정", description = "id의 에피소드를<strong>수정</strong> 합니다. 발행=>임시저장은 불가")
    public ResponseEntity<?> editEpisode(@PathVariable Long episodeId,
                                         @RequestBody EpisodeRegistDto episodeRegistDto,
                                         @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        episodeService.updateEpisode(episodeId, episodeRegistDto, customUserDetails.getMember());
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/purchasing")
    @Operation(summary = "에피소드 구매", description = "에피소드를 <strong>구매</strong> 합니다.")
    public ResponseEntity<?> purchaseEpisode(@RequestBody EpisodePurchasingDto episodePurchasingDto,
                                             @AuthenticationPrincipal CustomUserDetails customUserDetails){
        Integer statusCode = episodeService.purchaseEpisode(episodePurchasingDto, customUserDetails.getMember());
        return new ResponseEntity<>(HttpStatus.valueOf(statusCode));
    }

    @GetMapping("/purchased-on")
    @Operation(summary = "구매한 에피소드 목록", description = "<strong>구매한 에피소드를 조회</strong> 합니다.")
    public ResponseEntity<Page<EpisodePurchasedOnDto>> getPurchasedEp(@AuthenticationPrincipal CustomUserDetails customUserDetails,
                                                                      Pageable pageable) {
        Page<EpisodePurchasedOnDto> episodePurchasedOnPage = episodeService.getPurchasedOnEp(customUserDetails
                .getMember(), pageable);

        return new ResponseEntity<>(episodePurchasedOnPage, HttpStatus.OK);
    }
}
