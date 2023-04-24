package com.ssafy.novvel.member.service;

import com.ssafy.novvel.member.dto.request.MemberInfoRegistDto;
import com.ssafy.novvel.member.dto.response.MemberInfoDto;
import com.ssafy.novvel.member.entity.Member;
import java.io.IOException;
import org.springframework.web.multipart.MultipartFile;

public interface MemberService {

    MemberInfoDto getMemberInfo(Member member);

    Member addMemberInfo(MultipartFile file, MemberInfoRegistDto memberInfoRegistDto,
        Member member) throws IOException;

    void signOut(Member member);
}
