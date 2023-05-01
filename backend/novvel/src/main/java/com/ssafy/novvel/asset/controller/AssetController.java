package com.ssafy.novvel.asset.controller;

import com.ssafy.novvel.asset.dto.AssetPurchaseType;
import com.ssafy.novvel.asset.dto.AssetRegistDto;
import com.ssafy.novvel.asset.service.AssetService;
import com.ssafy.novvel.exception.NotFoundException;
import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.util.token.CustomUserDetails;
import lombok.RequiredArgsConstructor;
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

    @GetMapping("/purchasing/{assetId}")
    public ResponseEntity<?> searchByMemberId(@PathVariable("assetId") Long assetId,
                                              @AuthenticationPrincipal CustomUserDetails customUserDetails) {
        AssetPurchaseType assetPurchaseType = assetService.purchaseAsset(assetId, customUserDetails.getMember());
        switch (assetPurchaseType){
            case DUPLICATED:
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            case NEED_POINT:
                return new ResponseEntity<>(HttpStatus.OK);
            case PUCHASE:
                return new ResponseEntity<>(HttpStatus.CREATED);
            default:
                throw new IllegalArgumentException();
        }

    }


}
