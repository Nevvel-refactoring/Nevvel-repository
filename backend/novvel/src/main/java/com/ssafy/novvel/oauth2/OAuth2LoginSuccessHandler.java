package com.ssafy.novvel.oauth2;


import com.ssafy.novvel.util.token.jwt.JWTProvider;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final JWTProvider jwtProvider;

    public OAuth2LoginSuccessHandler(JWTProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
        Authentication authentication) {

        OidcUser oidcUser = (OidcUser) authentication.getPrincipal();

        Cookie accessToken = new Cookie("accessToken", jwtProvider.createAccessToken(
            oidcUser.getAttribute(CustomUserInfo.CLIENT_SUB.getValue())));
        Cookie refreshToken = new Cookie("refreshToken", jwtProvider.createRefreshToken());
        accessToken.setHttpOnly(true);
        refreshToken.setHttpOnly(true);
        accessToken.setPath("/");
        refreshToken.setPath("/");
        response.addCookie(accessToken);
        response.addCookie(refreshToken);

        if (authentication.getAuthorities().stream()
            .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_GUEST"))) {
            // TODO 기본 정보 입력 창으로 리다이렉트
        } else {
            // TODO 메인으로 리다이렉트
        }
    }
}
