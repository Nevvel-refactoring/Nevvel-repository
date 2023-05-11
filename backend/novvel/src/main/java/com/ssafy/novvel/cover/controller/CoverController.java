package com.ssafy.novvel.cover.controller;


import com.ssafy.novvel.cover.dto.CoverInfoAndEpisodesDto;
import com.ssafy.novvel.cover.dto.CoverModifyDto;
import com.ssafy.novvel.cover.dto.CoverRegisterDto;
import com.ssafy.novvel.cover.dto.CoverSearchConditions;
import com.ssafy.novvel.cover.dto.CoverWithConditions;
import com.ssafy.novvel.cover.service.CoverService;
import com.ssafy.novvel.resource.service.S3Service;
import com.ssafy.novvel.util.token.CustomUserDetails;
import java.io.IOException;
import org.springframework.data.domain.Page;
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
    public ResponseEntity<?> registerCover(@RequestPart(value = "file") MultipartFile file,
        @RequestPart(value = "coverRegisterDto") CoverRegisterDto coverRegisterDto,
        @AuthenticationPrincipal CustomUserDetails customUserDetails) throws IOException {

        coverService.registerCover(file, coverRegisterDto, customUserDetails.getMember());
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{cover-num}")
    public ResponseEntity<CoverInfoAndEpisodesDto> getAllEpisodes(@PathVariable("cover-num") Long coverNum,
        @AuthenticationPrincipal CustomUserDetails customUserDetails) {

        return new ResponseEntity<>(
            coverService.getAllEpisodes(coverNum, customUserDetails.getId()), HttpStatus.OK);
    }

    @PutMapping("/{cover-num}")
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
    public ResponseEntity<Page<CoverWithConditions>> searchCover(
        CoverSearchConditions coverSearchCriteria) {

        return new ResponseEntity<>(coverService.searchCoverWithCondition(coverSearchCriteria),
            HttpStatus.OK);

    }
}
