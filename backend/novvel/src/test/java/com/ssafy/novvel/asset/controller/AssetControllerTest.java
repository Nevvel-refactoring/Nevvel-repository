package com.ssafy.novvel.asset.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.novvel.asset.dto.AssetRegistDto;
import com.ssafy.novvel.asset.entity.AssetType;
import org.junit.jupiter.api.Disabled;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.mock.web.MockPart;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import java.io.FileInputStream;
import java.util.HashMap;
import java.util.List;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

@SpringBootTest
@AutoConfigureMockMvc
public class AssetControllerTest {

    @Autowired
    private ObjectMapper mapper;
    @Autowired
    private MockMvc mockMvc;


    //todo 컨트롤러 테스트 코드 고칠것
    @Test
    @Disabled
    @DisplayName("registAsset Test")
    @WithMockUser(roles = "USER")
    void registAssetTest() throws Exception {
        //given


        //when
        AssetRegistDto requestDto = new AssetRegistDto(AssetType.IMAGE, "title", "description", 10L, List.of("공포", "호러"));
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

        String assetRegistDtoJson =mapper.writeValueAsString(requestDto);

        new HashMap<String,String>().put("assetRegistDto",assetRegistDtoJson);
        //then
        mockMvc.perform(MockMvcRequestBuilders.multipart(HttpMethod.POST,"/assets")
                        .file(image)
                        .part(new MockPart("assetRegistDto",assetRegistDtoJson.getBytes()))
//                        .param("assetRegistDto",assetRegistDtoJson)
                        .contentType(MediaType.MULTIPART_FORM_DATA)
//                        .characterEncoding("UTF-8")
//                        .accept(MediaType.APPLICATION_JSON)
                        .with(csrf())
                )
                .andExpect(MockMvcResultMatchers.status().isCreated());
//                .andExpect(MockMvcResultMatchers.content().string(hello)); //응답 본문의 내용을 검증
    }
}
