package com.ssafy.novvel.cover.service;

import com.ssafy.novvel.cover.dto.CoverModifyDto;
import com.ssafy.novvel.cover.dto.CoverRegisterDto;
import com.ssafy.novvel.cover.entity.Cover;
import com.ssafy.novvel.member.entity.Member;
import java.io.IOException;
import java.util.List;
import javax.naming.AuthenticationException;
import org.springframework.web.multipart.MultipartFile;

public interface CoverService {

    Cover registerCover(MultipartFile multipartFile, CoverRegisterDto coverRegisterDto,
        Member member) throws IOException;

    List<String> updateCover(MultipartFile multipartFile, Long coverId, CoverModifyDto coverModifyDto,
        Long userId) throws AuthenticationException, IOException;

}
