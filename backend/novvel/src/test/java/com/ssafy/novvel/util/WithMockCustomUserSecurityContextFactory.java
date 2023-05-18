package com.ssafy.novvel.util;

import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.util.token.CustomUserDetails;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.test.context.support.WithSecurityContextFactory;

public class WithMockCustomUserSecurityContextFactory implements WithSecurityContextFactory<WithMockCustomUser> {
    @Override
    public SecurityContext createSecurityContext(WithMockCustomUser withMockCustomUser) {
        SecurityContext context = SecurityContextHolder.createEmptyContext();
        Member member = Member.builder()
                .sub(withMockCustomUser.sub())
                .email("test@google.com")
                .point(100L)
                .nickname(withMockCustomUser.username())
                .description("desc")
                .build();

        CustomUserDetails principal = new CustomUserDetails(member);
        Authentication authentication = new UsernamePasswordAuthenticationToken(principal, "pwd", principal.getAuthorities());
        context.setAuthentication(authentication);
        return context;
    }
}
