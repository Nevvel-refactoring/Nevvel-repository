package com.ssafy.novvel.sign.oauth2login;

import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.member.repository.MemberRepository;
import com.ssafy.novvel.util.token.UserDtoUtils;
import com.ssafy.novvel.util.token.jwt.JWTProvider;
import java.util.HashSet;
import java.util.Set;
import javax.servlet.http.Cookie;
import lombok.SneakyThrows;
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
    private final UserDtoUtils userDtoUtils;

    public OidcMemberService(MemberRepository memberRepository,
        JWTProvider jwtProvider, UserDtoUtils userDtoUtils) {
        this.memberRepository = memberRepository;
        this.jwtProvider = jwtProvider;
        this.userDtoUtils = userDtoUtils;
    }

    @SneakyThrows
    @Override
    public OidcUser loadUser(OidcUserRequest userRequest) throws OAuth2AuthenticationException {
        final OidcUserService delegate = new OidcUserService();

        final OidcUser oidcUser = delegate.loadUser(userRequest);

        String clientName = userRequest.getClientRegistration().getClientName();
        String clientSub = clientName + "_" + oidcUser.getName();

        Cookie refreshToken = jwtProvider.createRefreshToken();
        Cookie accessToken = jwtProvider.createAccessToken(clientSub);

        Member member = findOrCreateMember(clientSub, oidcUser.getEmail(), refreshToken.getValue());
        log.info(member.toString());
        return new DefaultOidcUser(getAuthority(member.getRole()), oidcUser.getIdToken(),
            OidcUserInfo.builder()
                .claim(UserDtoUtils.USER_DTO,
                    userDtoUtils.createUserDtoCookie(member, accessToken.getMaxAge()))
                .claim(JWTProvider.getRefreshToken(), refreshToken)
                .claim(JWTProvider.getAccessToken(), accessToken)
                .build());
    }

    private Member findOrCreateMember(String sub, String email, String refreshToken) {
        Member member = memberRepository.findBySub(sub)
            .orElseGet(() -> memberRepository.save(Member.builder()
                .sub(sub)
                .email(email)
                .nickname(sub)
                .description("자기소개를 입력해주세요")
                .role("ROLE_USER")
                .refreshToken(refreshToken)
                .point(0L)
                .build()));

        member.updateToken(refreshToken);
        member = memberRepository.save(member);

        if(member.getProfile() != null) {
            return memberRepository.findSubJoinFetchResource(sub);
        }

        return member;
    }


    private Set<GrantedAuthority> getAuthority(String role) {
        Set<GrantedAuthority> mappedAuthorities = new HashSet<>();

        mappedAuthorities.add(new SimpleGrantedAuthority(role));

        return mappedAuthorities;
    }
}
