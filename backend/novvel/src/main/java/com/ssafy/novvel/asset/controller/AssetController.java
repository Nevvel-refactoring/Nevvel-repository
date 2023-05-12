package com.ssafy.novvel.asset.controller;

import com.ssafy.novvel.asset.dto.AssetFilterDto;
import com.ssafy.novvel.asset.dto.AssetRegistDto;
import com.ssafy.novvel.asset.dto.AssetSearchDto;
import com.ssafy.novvel.asset.dto.AssetSearchReqKeywordTagDto;
import com.ssafy.novvel.asset.service.AssetService;
import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.util.ControllerUtils;
import com.ssafy.novvel.util.token.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Controller
@RequiredArgsConstructor
@RequestMapping("/assets")
@Slf4j
public class AssetController {

    private final AssetService assetService;

    @GetMapping
    public ResponseEntity<?> searhAsset(AssetFilterDto assetFilterDto,
                                        @AuthenticationPrincipal Object principal,
                                        Pageable pageable) {
        Member member = ControllerUtils.isCustomUserDetails(principal);
        log.info("AssetFilterDto: " + assetFilterDto.toString());
        Page<AssetSearchDto> result = assetService.searchAsset(assetFilterDto, member, pageable);

        return new ResponseEntity<>(result, HttpStatus.OK);

    }

    @GetMapping("/search")
    public ResponseEntity<Page> searchAssetByKeywordAndTags(AssetSearchReqKeywordTagDto assetSearchReqKeywordTagDto,
                                                            @AuthenticationPrincipal Object principal,
                                                            Pageable pageable) {
        Member member = ControllerUtils.isCustomUserDetails(principal);
        Page<AssetSearchDto> assetSearchDtos = assetService.searchAssetByKeywordAndTags(assetSearchReqKeywordTagDto, member, pageable);
        return new ResponseEntity<>(assetSearchDtos, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> registAsset(@RequestPart(value = "file", required = true) MultipartFile file,
                                         @RequestPart(value = "assetRegistDto", required = true) AssetRegistDto assetRegistDto,
                                         @AuthenticationPrincipal CustomUserDetails customUserDetails) throws IOException {

        Member member = customUserDetails.getMember();
        assetService.addAsset(file, member, assetRegistDto);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/{assetId}")
    public ResponseEntity<?> updateAsset(@PathVariable("assetId") Long id,
                                         @RequestBody AssetRegistDto assetRegistDto,
                                         @AuthenticationPrincipal CustomUserDetails customUserDetails) {

        Member member = customUserDetails.getMember();
        assetService.updateAsset(id, member, assetRegistDto);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/uploader/{memberId}")
    public ResponseEntity<Page<AssetSearchDto>> searchByMemberId(@PathVariable("memberId") Long memberId,
                                                                 @AuthenticationPrincipal Object principal,
                                                                 Pageable pageable) {
        Member member = ControllerUtils.isCustomUserDetails(principal);
        Page<AssetSearchDto> assetSearchDtoPage =
                assetService.searchAssetByUploader(memberId, member, pageable);

        return new ResponseEntity<>(assetSearchDtoPage, HttpStatus.OK);
    }

    @PostMapping("/purchasing/{assetId}")
    public ResponseEntity<?> purchaseAsset(@PathVariable("assetId") Long assetId,
                                           @AuthenticationPrincipal CustomUserDetails customUserDetails) {

        Integer statusCode = assetService.purchaseAsset(assetId, customUserDetails.getMember());

        return new ResponseEntity<>(HttpStatus.valueOf(statusCode));
    }

    @GetMapping("/purchased-on")
    public ResponseEntity<Page<AssetSearchDto>> myAssets(@AuthenticationPrincipal CustomUserDetails customUserDetails,
                                                         Pageable pageable) {

        Page<AssetSearchDto> result = assetService.searchMyAssets(customUserDetails.getMember(), pageable);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }


}
