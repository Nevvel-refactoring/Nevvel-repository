package com.ssafy.novvel.sign.signout;

import com.ssafy.novvel.member.repository.MemberRepository;
import com.ssafy.novvel.util.token.CustomUserDetails;
import com.ssafy.novvel.util.token.UserDtoUtils;
import java.io.IOException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.transaction.Transactional;

import com.ssafy.novvel.util.token.jwt.JWTProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class LogoutSuccessHandlerImpl implements LogoutSuccessHandler {

    @Value("${redirect.url}")
    private String url;
    private final MemberRepository memberRepository;
    private final JWTProvider jwtProvider;
    private final UserDtoUtils userDtoUtils;



    @Override
    @Transactional
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response,
        Authentication authentication) throws IOException {
        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

        response.addCookie(jwtProvider.createEmptyCookie(JWTProvider.getAccessToken()));
        response.addCookie(jwtProvider.createEmptyCookie(JWTProvider.getRefreshToken()));
        response.addCookie(userDtoUtils.removeUserDtoCookie());

        customUserDetails.getMember().removeToken();

        memberRepository.save(customUserDetails.getMember());
        response.sendRedirect(url);
    }
}
