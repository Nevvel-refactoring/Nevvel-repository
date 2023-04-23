package com.ssafy.novvel.member.service;

import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.member.repository.MemberRepository;
import com.ssafy.novvel.oauth2.OidcMemberService;
import com.ssafy.novvel.util.TestUtil;
import com.ssafy.novvel.util.token.jwt.JWTProvider;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.Optional;
import java.util.Set;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.GrantedAuthority;

@ExtendWith(MockitoExtension.class)
class OidcMemberServiceTest {

    private OidcMemberService oidcMemberService;

    @Mock
    private MemberRepository memberRepository;

    @Mock
    private JWTProvider jwtProvider;

    private final String GET_AUTHORITY = "getAuthority";

    @Test
    @DisplayName("login GUEST Test")
    public void loginGUEST()
        throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {

        //reflection
        oidcMemberService = new OidcMemberService(memberRepository, jwtProvider);
        Method getAuthority = OidcMemberService.class.getDeclaredMethod(GET_AUTHORITY,
            String.class, String.class, String.class);
        getAuthority.setAccessible(true);

        Optional<Member> guestMember = TestUtil.getGUESTMember();
        // when
        Mockito.doReturn(guestMember).when(memberRepository)
            .findBySub(guestMember.get().getSub());
        Set<GrantedAuthority> result = (Set<GrantedAuthority>) getAuthority.invoke(
            oidcMemberService, guestMember.get().getSub(), guestMember.get().getEmail(), "testToken");

        // then
        Assertions.assertThat(result.stream()
                .allMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_GUEST")))
            .isTrue();
    }

    @Test
    @DisplayName("login USER Test")
    public void loginUSER()
        throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        //reflection
        oidcMemberService = new OidcMemberService(memberRepository, jwtProvider);
        Method getAuthority = OidcMemberService.class.getDeclaredMethod(GET_AUTHORITY,
            String.class, String.class, String.class);
        getAuthority.setAccessible(true);
        Optional<Member> userMember = TestUtil.getUSERMember();

        // when
        Mockito.doReturn(userMember).when(memberRepository)
            .findBySub(userMember.get().getSub());
        Set<GrantedAuthority> result = (Set<GrantedAuthority>) getAuthority.invoke(
            oidcMemberService, userMember.get().getSub(),
            userMember.get().getEmail(), "testToken");

        // then
        Assertions.assertThat(result.stream()
                .allMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_USER")))
            .isTrue();
    }

    @Test
    @DisplayName("sign up Test")
    public void signUp()
        throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {
        //reflection
        oidcMemberService = new OidcMemberService(memberRepository, jwtProvider);
        Method getAuthority = OidcMemberService.class.getDeclaredMethod(GET_AUTHORITY,
            String.class, String.class, String.class);
        getAuthority.setAccessible(true);
        Optional<Member> guestMember = TestUtil.getGUESTMember();

        //when
        Mockito.doReturn(Optional.empty()).when(memberRepository).
            findBySub(guestMember.get().getSub());
        Mockito.doReturn(guestMember.get()).when(memberRepository).
            save(Mockito.any(Member.class));
        Set<GrantedAuthority> result = (Set<GrantedAuthority>) getAuthority.invoke(
            oidcMemberService, guestMember.get().getSub(),
            guestMember.get().getEmail(), "testToken");

        // then
        Assertions.assertThat(result.stream()
                .allMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_GUEST")))
            .isTrue();
    }

}