package com.ssafy.novvel.asset.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.novvel.asset.dto.AssetRegistDto;
import com.ssafy.novvel.asset.entity.Asset;
import com.ssafy.novvel.asset.entity.AssetTag;
import com.ssafy.novvel.asset.entity.AssetType;
import com.ssafy.novvel.asset.entity.Tag;
import com.ssafy.novvel.asset.repository.AssetRepository;
import com.ssafy.novvel.asset.repository.AssetTagRepository;
import com.ssafy.novvel.asset.repository.TagRepository;
import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.member.repository.MemberRepository;
import com.ssafy.novvel.memberasset.repository.MemberAssetRepository;
import com.ssafy.novvel.resource.entity.Resource;
import com.ssafy.novvel.resource.repository.ResourceRepository;
import com.ssafy.novvel.util.TestUtil;
import com.ssafy.novvel.util.WithMockCustomUser;
import com.ssafy.novvel.util.token.CustomUserDetails;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import java.io.FileInputStream;
import java.nio.charset.StandardCharsets;
import java.util.List;

import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;

@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("integration")
public class AssetControllerTest {

    @Autowired
    private MemberRepository memberRepository;
    @Autowired
    private AssetRepository assetRepository;
    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private MemberAssetRepository memberAssetRepository;
    @Autowired
    private AssetTagRepository assetTagRepository;
    @Autowired
    private ResourceRepository resourceRepository;
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
    @DisplayName("registAsset Test")
//    @WithMockUser(roles = "USER")
//    @WithUserDetails("Kakao_2755574745")
    @WithMockCustomUser
    void registAssetTest() throws Exception {

        //given
        CustomUserDetails customUserDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        member = customUserDetails.getMember();
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
    @DisplayName("searchByMemberId Test")
//    @WithMockUser(roles = "USER")
//    @WithUserDetails("Kakao_2755574745")
    @WithMockCustomUser
    void searchByMemberIdTest() throws Exception {

        //given
        CustomUserDetails customUserDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        member = customUserDetails.getMember();
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

    @Test
    @DisplayName("updateAssetTest")
//    @WithMockUser(roles = "USER")
//    @WithUserDetails("Kakao_2755574745")
    @WithMockCustomUser
    void updateAssetTest() throws Exception {

        //given
        CustomUserDetails customUserDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        member = customUserDetails.getMember();
        member = memberRepository.save(member);
        Resource resource = TestUtil.getResource();
        resource = resourceRepository.save(resource);
        Asset asset = Asset.builder()
                .title("title")
                .description("desc")
                .point(10L)
                .type(AssetType.IMAGE)
                .member(member)
                .resource(resource)
                .downloadCount(0L)
                .build();
        assetRepository.save(asset);
        List<Tag> tags = TestUtil.getTagIntegList(2);
        tags = tagRepository.saveAll(tags);
        List<AssetTag> assetTags = List.of(
                new AssetTag(asset, tags.get(0)),
                new AssetTag(asset, tags.get(1))
        );
        assetTags = assetTagRepository.saveAll(assetTags);
        AssetRegistDto requestDto =
                new AssetRegistDto(AssetType.IMAGE, "newTitle", "newDescription", 100L, List.of("깝놀", "귀신"));

        //when
        //then
        mockMvc.perform(MockMvcRequestBuilders.put("/assets/"+asset.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(mapper.writeValueAsString(requestDto))
                        .with(csrf())
                )
                .andExpect(MockMvcResultMatchers.status().isCreated());
    }

    @Test
    @DisplayName("purchaseAsset: 201")
    @WithMockCustomUser
    void purchaseAsset201Test() throws Exception {
        //given
        CustomUserDetails customUserDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        member = customUserDetails.getMember();
        member.setNickname("buyer");
        member.setPoint(100L);
        member = memberRepository.save(member);

        Member seller = TestUtil.getTestMember();
        seller.setNickname("seller");
        seller = memberRepository.save(seller);
        Resource resource = TestUtil.getResource();
        resource = resourceRepository.save(resource);
        Asset asset = Asset.builder()
                .title("title")
                .description("desc")
                .point(10L)
                .type(AssetType.IMAGE)
                .member(seller)
                .resource(resource)
                .downloadCount(0L)
                .build();
        assetRepository.save(asset);


        //when
        //then
        mockMvc.perform(MockMvcRequestBuilders.post("/assets/purchasing/"+asset.getId())
                        .with(csrf())
                )
                .andExpect(MockMvcResultMatchers.status().isCreated());
    }

    @Test
    @DisplayName("purchaseAsset: 200")
    @WithMockCustomUser
    void purchaseAsset200Test() throws Exception {
        //given
        CustomUserDetails customUserDetails = (CustomUserDetails) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        member = customUserDetails.getMember();
        member.setNickname("buyer");
        member.setPoint(5L);
        member = memberRepository.save(member);

        Member seller = TestUtil.getTestMember();
        seller.setNickname("seller");
        seller = memberRepository.save(seller);
        Resource resource = TestUtil.getResource();
        resource = resourceRepository.save(resource);
        Asset asset = Asset.builder()
                .title("title")
                .description("desc")
                .point(10L)
                .type(AssetType.IMAGE)
                .member(seller)
                .resource(resource)
                .downloadCount(0L)
                .build();
        assetRepository.save(asset);


        //when
        //then
        mockMvc.perform(MockMvcRequestBuilders.post("/assets/purchasing/"+asset.getId())
                        .with(csrf())
                )
                .andExpect(MockMvcResultMatchers.status().isOk());
    }




}
