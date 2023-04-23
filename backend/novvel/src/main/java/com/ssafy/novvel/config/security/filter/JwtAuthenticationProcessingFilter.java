package com.ssafy.novvel.config.security.filter;

import com.ssafy.novvel.member.repository.MemberRepository;
import com.ssafy.novvel.util.token.CustomUserDetails;
import com.ssafy.novvel.util.token.jwt.JWTProvider;
import io.jsonwebtoken.ExpiredJwtException;
import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

public class JwtAuthenticationProcessingFilter extends OncePerRequestFilter {

    private final JWTProvider jwtProvider;
    private final MemberRepository memberRepository;

    public JwtAuthenticationProcessingFilter(JWTProvider jwtProvider,
        MemberRepository memberRepository) {
        this.jwtProvider = jwtProvider;
        this.memberRepository = memberRepository;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
        FilterChain filterChain) throws ServletException, IOException {

        String accessToken = null;
        String refreshToken = null;
        for(Cookie cookie : request.getCookies()) {
            if(cookie.getName().equals("accessToken")) {
                accessToken = cookie.getValue();
            } else if(cookie.getName().equals("refreshToken")) {
                refreshToken = cookie.getValue();
            }
        }

        if(accessToken != null ) {
            try {
                String clientSub = jwtProvider.validateToken(accessToken);
                memberRepository.findBySub(clientSub).ifPresentOrElse(member -> {
                    UserDetails userDetailsUser = CustomUserDetails.builder()
                        .member(member)
                        .build();

                    Authentication authentication =
                        new UsernamePasswordAuthenticationToken(userDetailsUser, null,
                            userDetailsUser.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }, () -> response.setStatus(HttpStatus.UNAUTHORIZED.value()));
            } catch (ExpiredJwtException e) {
                response.setStatus(HttpStatus.UNAUTHORIZED.value());
                return;
            }
        }

        filterChain.doFilter(request, response);
    }
}