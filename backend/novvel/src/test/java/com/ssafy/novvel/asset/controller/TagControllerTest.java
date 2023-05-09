package com.ssafy.novvel.asset.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.novvel.asset.entity.Tag;
import com.ssafy.novvel.asset.repository.TagRepository;
import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.util.TestUtil;
import com.ssafy.novvel.util.WithMockCustomUser;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import java.util.List;
import static org.hamcrest.Matchers.*;
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("integration")
public class TagControllerTest {
    @Autowired
    private TagRepository tagRepository;
    @Autowired
    private MockMvc mockMvc;
    @Autowired
    private ObjectMapper mapper;

    Member member = TestUtil.getTestMember();
//    @BeforeEach
//    void setContext(){
//        CustomUserDetails customUserDetails = new CustomUserDetails(member);
//        SecurityContextHolder.getContext()
//                .setAuthentication(new UsernamePasswordAuthenticationToken(customUserDetails, null,
//                        customUserDetails.getAuthorities()));
//    }

    @Test
    @WithMockCustomUser
    void findTagPageTest() throws Exception {
        //given
        List<Tag> tags = TestUtil.getTagIntegList(10);
        tags = tagRepository.saveAll(tags);


        //then
        mockMvc.perform(MockMvcRequestBuilders.get("/tags")
                        .param("page","1")
                        .param("size","5")
                        .param("sort","id")

                )
                .andExpect(MockMvcResultMatchers.jsonPath("$.content").isArray())
                .andExpect(MockMvcResultMatchers.jsonPath("$.content.length()",is(5)))
//                .andExpect(MockMvcResultMatchers.content().json().)
                .andExpect(MockMvcResultMatchers.status().isOk());


    }
}
