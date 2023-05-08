package com.ssafy.novvel.asset.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.novvel.asset.dto.AssetRegistDto;
import com.ssafy.novvel.asset.entity.AssetType;
import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.member.repository.MemberRepository;
import com.ssafy.novvel.util.TestUtil;
import com.ssafy.novvel.util.WithMockCustomUser;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.transaction.annotation.Transactional;
import java.io.FileInputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

@SpringBootTest
@AutoConfigureMockMvc
public class AssetControllerTest {

    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private ObjectMapper mapper;
    @Autowired
    private MockMvc mockMvc;
    Member member = TestUtil.getTestMember();

//    @BeforeEach
//    void setContext(){
//        CustomUserDetails customUserDetails = new CustomUserDetails(member);
//        SecurityContextHolder.getContext()
//                .setAuthentication(new UsernamePasswordAuthenticationToken(customUserDetails, null,
//                        customUserDetails.getAuthorities()));
//    }

    @Test
    @Transactional
    @DisplayName("registAsset Test")
//    @WithMockUser(roles = "USER")
//    @WithUserDetails("Kakao_2755574745")
    @WithMockCustomUser
    void registAssetTest() throws Exception {

        //given
        member = memberRepository.save(member);

        AssetRegistDto requestDto =
                new AssetRegistDto(AssetType.IMAGE, "title", "description", 10L, List.of("공포", "호러"));
        final String fileName = "test"; //파일명
        final String contentType = "gif"; //파일타입
        final String filePath = "src/test/resources/test.gif"; //파일경로
        FileInputStream fileInputStream = new FileInputStream(filePath);

        //Mock파일생성
        MockMultipartFile image = new MockMultipartFile(
                "file", //name
                fileName + "." + contentType, //originalFilename
                contentType,
                fileInputStream
        );

        String assetRegistDtoJson = mapper.writeValueAsString(requestDto);
        MockMultipartFile assetRegistDto = new MockMultipartFile("assetRegistDto", "assetRegistDto", "application/json", assetRegistDtoJson.getBytes(StandardCharsets.UTF_8));


        //when
        //then
        mockMvc.perform(MockMvcRequestBuilders.multipart(HttpMethod.POST, "/assets")
                        .file(image)
                        .file(assetRegistDto)
                        .contentType(MediaType.MULTIPART_FORM_DATA)
                        .with(csrf())
                )
                .andExpect(MockMvcResultMatchers.status().isCreated());
//                .andExpect(MockMvcResultMatchers.content().string(hello)); //응답 본문의 내용을 검증
    }

    @Test
    @Transactional
    @DisplayName("searchByMemberId Test")
//    @WithMockUser(roles = "USER")
//    @WithUserDetails("Kakao_2755574745")
    @WithMockCustomUser
    void searchByMemberIdTest() throws Exception {

        //given
        member = memberRepository.save(member);

        AssetRegistDto requestDto =
                new AssetRegistDto(AssetType.IMAGE, "title", "description", 10L, List.of("공포", "호러"));
        final String fileName = "test"; //파일명
        final String contentType = "gif"; //파일타입
        final String filePath = "src/test/resources/test.gif"; //파일경로
        FileInputStream fileInputStream = new FileInputStream(filePath);

        //Mock파일생성
        MockMultipartFile image = new MockMultipartFile(
                "file", //name
                fileName + "." + contentType, //originalFilename
                contentType,
                fileInputStream
        );

        String assetRegistDtoJson = mapper.writeValueAsString(requestDto);
        MockMultipartFile assetRegistDto = new MockMultipartFile("assetRegistDto", "assetRegistDto", "application/json", assetRegistDtoJson.getBytes(StandardCharsets.UTF_8));


        //when
        //then
        mockMvc.perform(MockMvcRequestBuilders.multipart(HttpMethod.GET, "/assets/uploader/"+member.getId())
                        .file(image)
                        .file(assetRegistDto)
                        .contentType(MediaType.MULTIPART_FORM_DATA)
                        .with(csrf())
                )
                .andExpect(MockMvcResultMatchers.status().isOk());
//                .andExpect(MockMvcResultMatchers.content().string(hello)); //응답 본문의 내용을 검증
    }
}
