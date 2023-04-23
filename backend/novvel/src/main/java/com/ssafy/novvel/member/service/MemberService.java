package com.ssafy.novvel.member.service;

import com.ssafy.novvel.member.dto.MemberInfoRegistDto;
import com.ssafy.novvel.member.entity.Member;
import java.io.IOException;
import org.springframework.web.multipart.MultipartFile;

public interface MemberService {

    Member addMemberInfo(MultipartFile file, MemberInfoRegistDto memberInfoRegistDto,
        Member member) throws IOException;
}
