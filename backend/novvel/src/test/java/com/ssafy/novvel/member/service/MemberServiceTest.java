package com.ssafy.novvel.member.service;

import com.ssafy.novvel.member.dto.MemberInfoRegistDto;
import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.member.repository.MemberRepository;
import com.ssafy.novvel.resource.entity.Resource;
import com.ssafy.novvel.resource.service.ResourceService;
import com.ssafy.novvel.util.TestUtil;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

@ExtendWith(MockitoExtension.class)
class MemberServiceTest {

    @InjectMocks
    MemberServiceImpl memberServiceImpl;

    @Mock
    private ResourceService resourceService;

    @Mock
    private MemberRepository memberRepository;

    @Test
    @DisplayName("addMemberInfo with Desc Test")
    void addMemberInfo() throws IOException {
        File file = new File("src/test/resources/cat.jpeg");

        MultipartFile multipartFile = new MockMultipartFile(file.getName(), file.getName(),
            Files.probeContentType(file.toPath()), Files.readAllBytes(file.toPath()));
        Resource resource = TestUtil.getMemberProfile();

        MemberInfoRegistDto memberInfoRegistDto = MemberInfoRegistDto.builder()
            .description("test")
            .nickname("user")
            .build();

        Member member = TestUtil.getUSERMemberHasDesc();

        Mockito.doReturn(resource).when(resourceService).saveFile(multipartFile);
        Mockito.doReturn(member).when(memberRepository).save(Mockito.any());

        Member result = memberServiceImpl.addMemberInfo(multipartFile, memberInfoRegistDto,
            TestUtil.getGUESTMember().get());

        Assertions.assertThat(result.getDescription())
            .isEqualTo(memberInfoRegistDto.getDescription());
        Assertions.assertThat(result.getNickname()).isEqualTo(memberInfoRegistDto.getNickname());
        Assertions.assertThat(result.getRole()).isEqualTo(member.getRole());
    }

    @Test
    @DisplayName("addMemberInfo without Desc Test")
    void addMemberInfoWithoutDesc() throws IOException {
        File file = new File("src/test/resources/cat.jpeg");

        MultipartFile multipartFile = new MockMultipartFile(file.getName(), file.getName(),
            Files.probeContentType(file.toPath()), Files.readAllBytes(file.toPath()));
        Resource resource = TestUtil.getMemberProfile();

        MemberInfoRegistDto memberInfoRegistDto = MemberInfoRegistDto.builder()
            .nickname("user")
            .build();

        Member member = TestUtil.getUSERMember().get();

        Mockito.doReturn(resource).when(resourceService).saveFile(multipartFile);
        Mockito.doReturn(member).when(memberRepository).save(Mockito.any());

        Member result = memberServiceImpl.addMemberInfo(multipartFile, memberInfoRegistDto,
            TestUtil.getGUESTMember().get());

        Assertions.assertThat(result.getDescription())
            .isEqualTo(null);
        Assertions.assertThat(result.getNickname()).isEqualTo(memberInfoRegistDto.getNickname());
        Assertions.assertThat(result.getRole()).isEqualTo(member.getRole());
    }
}