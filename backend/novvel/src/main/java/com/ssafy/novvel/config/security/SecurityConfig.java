package com.ssafy.novvel.config.security;

import com.ssafy.novvel.config.security.filter.JwtAuthenticationProcessingFilter;
import com.ssafy.novvel.member.repository.MemberRepository;
import com.ssafy.novvel.util.token.jwt.JWTProvider;
import java.util.Arrays;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.servlet.http.HttpServletResponse;


@Slf4j
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final AuthenticationSuccessHandler OAuth2LoginSuccessHandler;
    private final OAuth2UserService<OidcUserRequest, OidcUser> oidcUserService;
    private final JWTProvider jwtProvider;
    private final MemberRepository memberRepository;
    private final LogoutSuccessHandler logoutSuccessHandler;

    public SecurityConfig(
        AuthenticationSuccessHandler OAuth2LoginSuccessHandler,
        OAuth2UserService<OidcUserRequest, OidcUser> oidcUserService,
        JWTProvider jwtProvider,
        MemberRepository memberRepository,
        LogoutSuccessHandler logoutSuccessHandler) {
        this.OAuth2LoginSuccessHandler = OAuth2LoginSuccessHandler;
        this.oidcUserService = oidcUserService;
        this.jwtProvider = jwtProvider;
        this.memberRepository = memberRepository;
        this.logoutSuccessHandler = logoutSuccessHandler;
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();
        corsConfiguration.setAllowedOrigins(
            Arrays.asList("http://k8d1061.p.ssafy.io", "http://k8d106.p.ssafy.io:3000", "https://k8d106.p.ssafy.io",
                    "http://localhost:3000"));
        corsConfiguration.addAllowedMethod("*");
        corsConfiguration.addAllowedHeader("*");
        corsConfiguration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource urlBasedCorsConfigurationSource = new UrlBasedCorsConfigurationSource();
        // 허용할 path 설정
        urlBasedCorsConfigurationSource.registerCorsConfiguration("/**", corsConfiguration);
        return urlBasedCorsConfigurationSource;
    }


    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf().disable()
            .cors()
            .and()
            .authorizeHttpRequests(authorize -> authorize
                .antMatchers(HttpMethod.GET, "/covers").permitAll()
                .anyRequest().authenticated()
            )
            .oauth2Login(oauth2 -> oauth2
                .userInfoEndpoint(userInfo -> userInfo
                    .oidcUserService(oidcUserService)
                )
                .successHandler(OAuth2LoginSuccessHandler)
            )
            .logout(logout -> logout
                .logoutUrl("/users/signout")
                .logoutSuccessUrl("http://k8d1061.p.ssafy.io/")
                .deleteCookies(JWTProvider.getAccessToken(), JWTProvider.getRefreshToken())
                .logoutSuccessHandler(logoutSuccessHandler)
            )
            .addFilterBefore(new JwtAuthenticationProcessingFilter(jwtProvider, memberRepository),
                LogoutFilter.class);

        //todo 에러발생시 처리 로직 수정 필요
        http.exceptionHandling()
                .authenticationEntryPoint((request, response, authException) -> {
                    authException.printStackTrace();
                    response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                })
                .accessDeniedHandler((request, response, accessDeniedException) -> {
                    accessDeniedException.printStackTrace();
                    response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                });
        return http.build();
    }
}
