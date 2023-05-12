package com.ssafy.novvel.sign.oauth2login;


import java.io.IOException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {
    @Value("${redirect.login.profile}")
    private String profile;
    @Value("${redirect.login.index}")
    private String index;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
        Authentication authentication) throws IOException {

        OidcUser oidcUser = (OidcUser) authentication.getPrincipal();

        response.addCookie(oidcUser.getAttribute("accessToken"));
        response.addCookie(oidcUser.getAttribute("refreshToken"));

        if (authentication.getAuthorities().stream()
            .anyMatch(grantedAuthority -> grantedAuthority.getAuthority().equals("ROLE_GUEST"))) {
            response.sendRedirect(profile);
        } else {
            response.sendRedirect(index);
        }
    }
}
