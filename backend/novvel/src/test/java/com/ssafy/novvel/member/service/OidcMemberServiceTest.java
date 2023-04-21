package com.ssafy.novvel.member.service;

import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.member.repository.MemberRepository;
import com.ssafy.novvel.oauth2.OidcMemberService;
import com.ssafy.novvel.util.TestUtil;
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

    private final String GET_AUTHORITY = "getAuthority";

    @Test
    @DisplayName("login GUEST Test")
    public void loginGUEST()
        throws NoSuchMethodException, InvocationTargetException, IllegalAccessException {

        //reflection
        oidcMemberService = new OidcMemberService(memberRepository);
        Method getAuthority = OidcMemberService.class.getDeclaredMethod(GET_AUTHORITY,
            String.class, String.class);
        getAuthority.setAccessible(true);

        // when
        Mockito.doReturn(TestUtil.getGUESTMember()).when(memberRepository)
            .findBySub(TestUtil.getGUESTMember().get().getSub());
        Set<GrantedAuthority> result = (Set<GrantedAuthority>) getAuthority.invoke(
            oidcMemberService, TestUtil.getGUESTMember().get().getSub(),
            TestUtil.getGUESTMember().get().getEmail());

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
        oidcMemberService = new OidcMemberService(memberRepository);
        Method getAuthority = OidcMemberService.class.getDeclaredMethod(GET_AUTHORITY,
            String.class, String.class);
        getAuthority.setAccessible(true);

        // when
        Mockito.doReturn(TestUtil.getUSERMember()).when(memberRepository)
            .findBySub(TestUtil.getUSERMember().get().getSub());
        Set<GrantedAuthority> result = (Set<GrantedAuthority>) getAuthority.invoke(
            oidcMemberService, TestUtil.getUSERMember().get().getSub(),
            TestUtil.getUSERMember().get().getEmail());

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
        oidcMemberService = new OidcMemberService(memberRepository);
        Method getAuthority = OidcMemberService.class.getDeclaredMethod(GET_AUTHORITY,
            String.class, String.class);
        getAuthority.setAccessible(true);

        //when
        Mockito.doReturn(Optional.empty()).when(memberRepository).
            findBySub(TestUtil.getGUESTMember().get().getSub());
        Mockito.doReturn(TestUtil.getGUESTMember().get()).when(memberRepository).
            save(Mockito.any(Member.class));
        Set<GrantedAuthority> result = (Set<GrantedAuthority>) getAuthority.invoke(
            oidcMemberService, TestUtil.getGUESTMember().get().getSub(),
            TestUtil.getGUESTMember().get().getEmail());

        // then
        Assertions.assertThat(result.stream()
                .allMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_GUEST")))
            .isTrue();
    }

}