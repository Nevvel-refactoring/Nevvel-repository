package com.ssafy.novvel.asset.controller;

import com.ssafy.novvel.asset.dto.AssetRegistDto;
import com.ssafy.novvel.asset.service.AssetService;
import com.ssafy.novvel.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Controller
@RequiredArgsConstructor
@RequestMapping("/asset")
public class AssetController {

    private final AssetService assetService;



    //todo 컨트롤러에서 사용자객체 받아오는 코드 수정할 것
    @PostMapping
    public ResponseEntity<?> registAsset(MultipartFile file, AssetRegistDto assetRegistDto, @AuthenticationPrincipal Member member) throws IOException {

        assetService.addAsset(file,member,assetRegistDto);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }


}
