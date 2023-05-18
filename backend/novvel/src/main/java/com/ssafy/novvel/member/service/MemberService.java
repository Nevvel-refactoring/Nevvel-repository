package com.ssafy.novvel.member.service;

import com.ssafy.novvel.member.dto.request.MemberInfoRegistDto;
import com.ssafy.novvel.member.dto.response.MemberChanged;
import com.ssafy.novvel.member.dto.response.MemberDescriptionDto;
import com.ssafy.novvel.member.dto.response.MemberInfoDto;
import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.resource.entity.Resource;
import java.io.IOException;
import java.util.Map;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.web.multipart.MultipartFile;

public interface MemberService {

    MemberDescriptionDto getMemberInfo(Member member);

    MemberChanged addMemberInfo(MultipartFile file, MemberInfoRegistDto memberInfoRegistDto,
        Member member) throws IOException;
}
