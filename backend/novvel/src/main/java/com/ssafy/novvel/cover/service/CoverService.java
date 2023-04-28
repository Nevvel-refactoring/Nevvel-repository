package com.ssafy.novvel.cover.service;

import com.ssafy.novvel.cover.dto.CoverRegisterDto;
import com.ssafy.novvel.cover.entity.Cover;
import com.ssafy.novvel.member.entity.Member;
import java.io.IOException;
import org.springframework.web.multipart.MultipartFile;

public interface CoverService {

    Cover registerCover(MultipartFile multipartFile, CoverRegisterDto coverRegisterDto,
        Member member) throws IOException;
}
