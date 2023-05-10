package com.ssafy.novvel.member.controller;


import com.ssafy.novvel.member.dto.request.MemberInfoRegistDto;
import com.ssafy.novvel.member.dto.response.MemberInfoDto;
import com.ssafy.novvel.member.service.MemberService;
import com.ssafy.novvel.util.token.CustomUserDetails;
import java.io.IOException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.multipart.MultipartFile;


@Controller
@RequestMapping("/users")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @GetMapping()
    public ResponseEntity<MemberInfoDto> getMemberInfo(
        @AuthenticationPrincipal CustomUserDetails customUserDetails) {

        return new ResponseEntity<>(memberService.getMemberInfo(customUserDetails.getMember()),
            HttpStatus.OK);
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registryMemberInfo(MultipartFile multipartFile,
        MemberInfoRegistDto memberInfoRegistDto,
        @AuthenticationPrincipal CustomUserDetails customUserDetails) throws IOException {

        memberService.addMemberInfo(multipartFile, memberInfoRegistDto,
            customUserDetails.getMember());
        return new ResponseEntity<>(HttpStatus.CREATED);
    }
}
