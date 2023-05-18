package com.ssafy.novvel.asset.controller;

import com.ssafy.novvel.asset.dto.AssetSearchDto;
import com.ssafy.novvel.asset.entity.Tag;
import com.ssafy.novvel.asset.service.AssetService;
import com.ssafy.novvel.util.token.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.util.ControllerUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;

@Controller
@RequiredArgsConstructor
@RequestMapping("/tags")
public class TagController {


    private final AssetService assetService;

    @GetMapping("/search")
    @Operation(summary = "태그를 통해 검색", description = "등록된 에셋을 <strong>태그를 통해 검색</strong> 합니다.")
    public ResponseEntity<Slice<AssetSearchDto>> findAssetsByTags(@RequestParam("keyword") List<String> keywords,
                                                                  @AuthenticationPrincipal Object principal,
                                                                  Pageable pageable) {
        Member member = ControllerUtils.isCustomUserDetails(principal);
        Slice<AssetSearchDto> result = assetService.searchAssetByTag(keywords, pageable, member);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping
    @Operation(summary = "태그 목록", description = "<strong>태그 목록 반환</strong> 합니다.")
    public ResponseEntity<Page<Tag>> findTagPage(Pageable pageable) {

        Page<Tag> pageTags = assetService.findPageTags(pageable);

        return new ResponseEntity<>(pageTags, HttpStatus.OK);
    }
}
