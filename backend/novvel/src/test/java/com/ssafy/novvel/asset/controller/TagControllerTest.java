package com.ssafy.novvel.asset.controller;

import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.util.TestUtil;
import com.ssafy.novvel.util.WithMockCustomUser;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

@SpringBootTest
@AutoConfigureMockMvc
public class TagControllerTest {

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

    //todo 예상 결과 JSON과 실제 결과 비교할것
    @Test
    @WithMockCustomUser
    void findTagPageTest() throws Exception {
        //given
        Pageable pageable = PageRequest.of(0, 5);

        //then
        mockMvc.perform(MockMvcRequestBuilders.get("/tags")

                )
//                .andExpect(MockMvcResultMatchers.content().json())
                .andExpect(MockMvcResultMatchers.status().isOk());


    }
}
