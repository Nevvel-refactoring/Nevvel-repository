package com.ssafy.novvel.cover.controller;


import com.ssafy.novvel.cover.dto.*;
import com.ssafy.novvel.cover.service.CoverService;
import com.ssafy.novvel.resource.service.S3Service;
import com.ssafy.novvel.util.ControllerUtils;
import com.ssafy.novvel.util.token.CustomUserDetails;
import java.io.IOException;
import lombok.extern.slf4j.Slf4j;
import io.swagger.v3.oas.annotations.Operation;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import java.util.Optional;
import javax.naming.AuthenticationException;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@RestController
@RequestMapping("/covers")
public class CoverController {

    private final CoverService coverService;
    private final S3Service S3Service;

    public CoverController(CoverService coverService, S3Service s3Service) {
        this.coverService = coverService;
        this.S3Service = s3Service;
    }

    @PostMapping()
    @Operation(summary = "소설(표지) 등록", description = "소설(표지)를 <strong>등록</strong> 합니다.")
    public ResponseEntity<?> registerCover(@RequestPart(value = "file") MultipartFile file,
        @RequestPart(value = "coverRegisterDto") CoverRegisterDto coverRegisterDto,
        @AuthenticationPrincipal CustomUserDetails customUserDetails) throws IOException {

        coverService.registerCover(file, coverRegisterDto, customUserDetails.getMember());
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{cover-num}")
    @Operation(summary = "소설(표지)의 에피소드 반환", description = "소설(표지)의 <strong>에피소드를 반환</strong> 합니다.")
    public ResponseEntity<CoverInfoAndEpisodesDto> getAllEpisodes(
        @PathVariable("cover-num") Long coverNum,
        @AuthenticationPrincipal Object principal) {

        log.info(String.valueOf(principal.getClass()));

        return new ResponseEntity<>(
            coverService.getAllEpisodes(coverNum, ControllerUtils.isCustomUserDetails(principal)),
            HttpStatus.OK);
    }

    @PutMapping("/{cover-num}")
    @Operation(summary = "소설(표지) 수정", description = "소설(표지)를 <strong>수정</strong> 합니다.")
    public ResponseEntity<?> modifyCover(@PathVariable("cover-num") Long coverId,
        @RequestPart(value = "file") MultipartFile file,
        @RequestPart(value = "coverModifyDto") CoverModifyDto coverModifyDto,
        @AuthenticationPrincipal CustomUserDetails customUserDetails)
        throws AuthenticationException, IOException {

        Optional.ofNullable(
                coverService.updateCover(file, coverId, coverModifyDto, customUserDetails.getId()))
            .ifPresent(strings -> {
                for (String s : strings) {
                    S3Service.deleteFile(s);
                }
            });
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping()
    @Operation(summary = "소설(표지) 목록", description = "<strong>소설(표지)들을 상태와 함께 반환</strong> 합니다.")
    public ResponseEntity<Page<CoverWithConditions>> searchCover(
        CoverSearchConditions coverSearchCriteria) {

        return new ResponseEntity<>(coverService.searchCoverWithCondition(coverSearchCriteria),
            HttpStatus.OK);

    }

    @GetMapping("/purchased-on")
    @Operation(summary = "구매한 소설(표지) 목록", description = "<strong>구매한 소설(표지)들을 반환</strong> 합니다.")
    public ResponseEntity<Page<CoverPurchasedDto>> getPurchasedCover(
        @AuthenticationPrincipal CustomUserDetails customUserDetails, Pageable pageable) {

        return new ResponseEntity<>(
            coverService.getPurchasedCover(customUserDetails.getMember(), pageable), HttpStatus.OK);
    }
}
