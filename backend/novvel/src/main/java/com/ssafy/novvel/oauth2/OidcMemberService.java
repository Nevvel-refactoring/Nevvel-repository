package com.ssafy.novvel.oauth2;

import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.member.repository.MemberRepository;
import com.ssafy.novvel.util.token.jwt.JWTProvider;
import java.util.HashSet;
import java.util.Set;
import javax.servlet.http.Cookie;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserRequest;
import org.springframework.security.oauth2.client.oidc.userinfo.OidcUserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.oidc.OidcUserInfo;
import org.springframework.security.oauth2.core.oidc.user.DefaultOidcUser;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class OidcMemberService implements OAuth2UserService<OidcUserRequest, OidcUser> {

    private final MemberRepository memberRepository;
    private final JWTProvider jwtProvider;

    public OidcMemberService(MemberRepository memberRepository,
        JWTProvider jwtProvider) {
        this.memberRepository = memberRepository;
        this.jwtProvider = jwtProvider;
    }

    @Override
    public OidcUser loadUser(OidcUserRequest userRequest) throws OAuth2AuthenticationException {
        final OidcUserService delegate = new OidcUserService();

        final OidcUser oidcUser = delegate.loadUser(userRequest);

        String clientName = userRequest.getClientRegistration().getClientName();
        String clientSub = clientName + "_" + oidcUser.getName();
        Cookie refreshToken = jwtProvider.createRefreshToken();
        Set<GrantedAuthority> mappedAuthorities = getAuthority(
            clientSub, oidcUser.getEmail(), refreshToken.getValue());

        return new DefaultOidcUser(mappedAuthorities, oidcUser.getIdToken(),
            OidcUserInfo.builder().claim(CustomUserInfo.CLIENT_SUB.getValue(), clientSub)
                .claim(JWTProvider.getRefreshToken(), refreshToken)
                .claim(JWTProvider.getAccessToken(), jwtProvider.createAccessToken(clientSub))
                .build());
    }

    private Set<GrantedAuthority> getAuthority(String sub, String email, String refreshToken) {
        Set<GrantedAuthority> mappedAuthorities = new HashSet<>();

        // TODO default profile image 생성

        memberRepository.findBySub(sub)
            .ifPresentOrElse(
                member -> {
                    mappedAuthorities.add(new SimpleGrantedAuthority(member.getRole()));
                    member.updateToken(refreshToken);
                    memberRepository.save(member);
                },
                () -> mappedAuthorities.add(new SimpleGrantedAuthority(
                        memberRepository.save(Member.builder()
                            .sub(sub)
                            .email(email)
                            .role("ROLE_GUEST")
                            .refreshToken(refreshToken)
                            .build()
                        ).getRole()
                    )
                )
            );

        return mappedAuthorities;
    }
}
