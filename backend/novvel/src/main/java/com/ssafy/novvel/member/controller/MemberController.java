package com.ssafy.novvel.member.controller;


import com.ssafy.novvel.member.dto.request.MemberInfoRegistDto;
import com.ssafy.novvel.member.dto.response.MemberChanged;
import com.ssafy.novvel.member.dto.response.MemberDescriptionDto;
import com.ssafy.novvel.member.service.MemberService;
import com.ssafy.novvel.resource.service.S3Service;
import com.ssafy.novvel.util.token.CustomUserDetails;
import com.ssafy.novvel.util.token.UserDtoUtils;
import com.ssafy.novvel.util.token.jwt.JWTProvider;
import java.io.IOException;

import io.swagger.v3.oas.annotations.Operation;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;


@Controller
@RequestMapping("/users")
public class MemberController {

    private final MemberService memberService;
    private final S3Service s3Service;
    private final JWTProvider jwtProvider;
    private final UserDtoUtils userDtoUtils;

    public MemberController(MemberService memberService,
        S3Service s3Service, JWTProvider jwtProvider,
        UserDtoUtils userDtoUtils) {
        this.memberService = memberService;
        this.s3Service = s3Service;
        this.jwtProvider = jwtProvider;
        this.userDtoUtils = userDtoUtils;
    }

    @GetMapping()
    @Operation(summary = "멤버 정보", description = "<strong>사용자가 작성한 자기소개를 반환</strong> 합니다.")
    public ResponseEntity<MemberDescriptionDto> getMemberInfo(
        @AuthenticationPrincipal CustomUserDetails customUserDetails) {

        return new ResponseEntity<>(memberService.getMemberInfo(customUserDetails.getMember()),
            HttpStatus.OK);
    }

    @PutMapping("/signup")
    @Operation(summary = "멤버 정보 수정", description = "<strong>사용자의 수정할 정보를 입력</strong> 합니다.")
    public ResponseEntity<?> registryMemberInfo(@RequestPart("file") MultipartFile multipartFile,
        @RequestPart("memberInfoRegistDto") MemberInfoRegistDto memberInfoRegistDto,
        @AuthenticationPrincipal CustomUserDetails customUserDetails,
        HttpServletRequest request, HttpServletResponse response) throws IOException {

        Cookie accessToken = null;

        for(Cookie cookie : request.getCookies()) {
            if(cookie.getName().equals(JWTProvider.getAccessToken())) {
                accessToken = cookie;
            }
        }

        MemberChanged memberChanged = memberService.addMemberInfo(multipartFile, memberInfoRegistDto,
            customUserDetails.getMember());

        if(memberChanged.getMember() != null && accessToken != null) {
            response.addCookie(userDtoUtils.createUserDtoCookie(memberChanged.getMember(), accessToken.getMaxAge()));
        }

        if(memberChanged.getRemovedResource() != null) {
            s3Service.deleteFile(memberChanged.getRemovedResource());
        }

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
