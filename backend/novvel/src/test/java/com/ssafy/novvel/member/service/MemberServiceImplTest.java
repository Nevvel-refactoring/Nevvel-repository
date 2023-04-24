package com.ssafy.novvel.member.service;

import static org.junit.jupiter.api.Assertions.*;

import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.member.repository.MemberRepository;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
class MemberServiceTest {

    @InjectMocks
    private MemberServiceImpl memberService;

    @Mock
    private MemberRepository memberRepository;

    @Test
    @DisplayName("sign out test")
    void userSignOut() {

        // given
        Member member = Member.builder()
            .id(1L)
            .email("email@naver.com")
            .nickname("nickname")
            .refreshToken("token")
            .point(0L)
            .build();

        // when
        memberService.signOut(member);

        // then
        Assertions.assertThat(member.getRefreshToken()).isEqualTo(null);
    }

}