package com.ssafy.novvel.config.security;

import com.ssafy.novvel.config.security.filter.JwtAuthenticationProcessingFilter;
import com.ssafy.novvel.member.repository.MemberRepository;
import com.ssafy.novvel.util.token.jwt.JWTProvider;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;


@Slf4j
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final AuthenticationSuccessHandler OAuth2LoginSuccessHandler;
    private final OAuth2UserService<OidcUserRequest, OidcUser> oidcUserService;
    private final JWTProvider jwtProvider;
    private final MemberRepository memberRepository;

    public SecurityConfig(
        AuthenticationSuccessHandler OAuth2LoginSuccessHandler,
        OAuth2UserService<OidcUserRequest, OidcUser> oidcUserService,
        JWTProvider jwtProvider,
        MemberRepository memberRepository) {
        this.OAuth2LoginSuccessHandler = OAuth2LoginSuccessHandler;
        this.oidcUserService = oidcUserService;
        this.jwtProvider = jwtProvider;
        this.memberRepository = memberRepository;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .authorizeHttpRequests(authorize -> authorize
                .anyRequest().authenticated()
            )
            .oauth2Login(oauth2 -> oauth2
                .userInfoEndpoint(userInfo -> userInfo
                    .oidcUserService(oidcUserService)
                )
                .successHandler(OAuth2LoginSuccessHandler)
            )
            .addFilterBefore(new JwtAuthenticationProcessingFilter(jwtProvider, memberRepository),
                UsernamePasswordAuthenticationFilter.class);
        return http.build();
    }
}
