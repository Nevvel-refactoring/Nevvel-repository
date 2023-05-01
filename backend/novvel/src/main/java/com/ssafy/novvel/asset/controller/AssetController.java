package com.ssafy.novvel.asset.controller;

import com.ssafy.novvel.asset.dto.AssetPurchaseType;
import com.ssafy.novvel.asset.dto.AssetRegistDto;
import com.ssafy.novvel.asset.dto.AssetSearchDto;
import com.ssafy.novvel.asset.service.AssetService;
import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.util.token.CustomUserDetails;
import lombok.RequiredArgsConstructor;
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
public class AssetController {

    private final AssetService assetService;


    @PostMapping
    public ResponseEntity<?> registAsset(@RequestPart(value = "file") MultipartFile file,
                                         @RequestPart("assetRegistDto") AssetRegistDto assetRegistDto,
                                         @AuthenticationPrincipal CustomUserDetails customUserDetails) throws IOException {

        Member member = customUserDetails.getMember();
        assetService.addAsset(file, member, assetRegistDto);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/uploader/{memberId}")
    public ResponseEntity<Page<AssetSearchDto>> searchByMemberId(@PathVariable("memberId") Long memberId,
                                                                 @AuthenticationPrincipal CustomUserDetails customUserDetails,
                                                                 Pageable pageable) {

        Page<AssetSearchDto> assetSearchDtoPage =
                assetService.searchAssetByUploader(memberId, customUserDetails.getMember(), pageable);

        return new ResponseEntity<>(assetSearchDtoPage, HttpStatus.OK);
    }
    @PostMapping("/purchasing/{assetId}")
    public ResponseEntity<?> searchByMemberId(@PathVariable("assetId") Long assetId,
                                              @AuthenticationPrincipal CustomUserDetails customUserDetails) {

        Integer statusCode = assetService.purchaseAsset(assetId, customUserDetails.getMember());

        return new ResponseEntity<>(HttpStatus.valueOf(statusCode));
    }


}
