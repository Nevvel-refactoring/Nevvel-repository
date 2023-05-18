package com.ssafy.novvel.asset.controller;

import com.ssafy.novvel.asset.dto.AssetFilterDto;
import com.ssafy.novvel.asset.dto.AssetRegistDto;
import com.ssafy.novvel.asset.dto.AssetSearchDto;
import com.ssafy.novvel.asset.dto.AssetSearchReqKeywordTagDto;
import com.ssafy.novvel.asset.entity.AssetType;
import com.ssafy.novvel.asset.service.AssetService;
import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.util.ControllerUtils;
import com.ssafy.novvel.util.token.CustomUserDetails;
import io.swagger.v3.oas.annotations.Operation;
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
    @Operation(summary = "에셋 검색", description = "에셋을 <strong>검색</strong> 합니다.")
    public ResponseEntity<?> searhAsset(AssetFilterDto assetFilterDto,
                                        @AuthenticationPrincipal Object principal,
                                        Pageable pageable) {
        Member member = ControllerUtils.isCustomUserDetails(principal);
        log.info("AssetFilterDto: " + assetFilterDto.toString());
        Page<AssetSearchDto> result = assetService.searchAsset(assetFilterDto, member, pageable);

        return new ResponseEntity<>(result, HttpStatus.OK);

    }

    @GetMapping("/search")
    @Operation(summary = "에셋 키워드 검색", description = "에셋을 <strong>키워드로 검색</strong> 합니다.")
    public ResponseEntity<Page> searchAssetByKeywordAndTags(AssetSearchReqKeywordTagDto assetSearchReqKeywordTagDto,
                                                            @AuthenticationPrincipal Object principal,
                                                            Pageable pageable) {
        Member member = ControllerUtils.isCustomUserDetails(principal);
        Page<AssetSearchDto> assetSearchDtos = assetService.searchAssetByKeywordAndTags(assetSearchReqKeywordTagDto, member, pageable);
        return new ResponseEntity<>(assetSearchDtos, HttpStatus.OK);
    }

    @PostMapping
    @Operation(summary = "에셋 등록", description = "에셋을 <strong>파일과 함께 등록</strong> 합니다.")
    public ResponseEntity<?> registAsset(@RequestPart(value = "file", required = true) MultipartFile file,
                                         @RequestPart(value = "assetRegistDto", required = true) AssetRegistDto assetRegistDto,
                                         @AuthenticationPrincipal CustomUserDetails customUserDetails) throws IOException {

        Member member = customUserDetails.getMember();
        assetService.addAsset(file, member, assetRegistDto);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @PutMapping("/{assetId}")
    @Operation(summary = "에셋 수정", description = "등록된 에셋을 <strong>수정</strong> 합니다.")
    public ResponseEntity<?> updateAsset(@PathVariable("assetId") Long id,
                                         @RequestBody AssetRegistDto assetRegistDto,
                                         @AuthenticationPrincipal CustomUserDetails customUserDetails) {

        Member member = customUserDetails.getMember();
        assetService.updateAsset(id, member, assetRegistDto);

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/uploader/{memberId}")
    @Operation(summary = "member_id가 등록한 에셋을 반환")
    public ResponseEntity<Page<AssetSearchDto>> searchByMemberId(@PathVariable("memberId") Long memberId,
                                                                 @RequestParam(value = "assettype", required = false) AssetType assetType,
                                                                 @AuthenticationPrincipal Object principal,
                                                                 Pageable pageable) {
        Member member = ControllerUtils.isCustomUserDetails(principal);
        Page<AssetSearchDto> assetSearchDtoPage =
                assetService.searchAssetByUploader(memberId, member, assetType, pageable);

        return new ResponseEntity<>(assetSearchDtoPage, HttpStatus.OK);
    }

    @PostMapping("/purchasing/{assetId}")
    @Operation(summary = "에셋 구매", description = "등록된 에셋을 <strong>asset Id를 통해 구매</strong> 합니다.")
    public ResponseEntity<?> purchaseAsset(@PathVariable("assetId") Long assetId,
                                           @AuthenticationPrincipal CustomUserDetails customUserDetails) {

        Integer statusCode = assetService.purchaseAsset(assetId, customUserDetails.getMember());

        return new ResponseEntity<>(HttpStatus.valueOf(statusCode));
    }

    @GetMapping("/purchased-on")
    @Operation(summary = "구매한 에셋 보기", description = "<strong>내가 구매한 에셋</strong>을 반환 합니다.")
    public ResponseEntity<Page<AssetSearchDto>> myAssets(@RequestParam(value = "assettype", required = false) AssetType assetType,
                                                         @AuthenticationPrincipal CustomUserDetails customUserDetails,
                                                         Pageable pageable) {

        Page<AssetSearchDto> result = assetService.searchMyAssets(assetType, customUserDetails.getMember(), pageable);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }

    @GetMapping("/own")
    @Operation(summary = "구매한 에셋 보기", description = "<strong>내가 구매한 에셋</strong>을 반환 합니다.")
    public ResponseEntity<Page<AssetSearchDto>> ownAssets(@RequestParam(value = "assettype", required = false) AssetType assetType,
                                                         @AuthenticationPrincipal CustomUserDetails customUserDetails,
                                                         Pageable pageable) {

        Page<AssetSearchDto> result = assetService.getOwnAssets(assetType, customUserDetails.getMember(), pageable);

        return new ResponseEntity<>(result, HttpStatus.OK);
    }


}
