package com.ssafy.novvel.util.token.jwt;


import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import javax.servlet.http.Cookie;
import org.springframework.stereotype.Component;

@Component
public class JWTProvider {

    private final Key KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    private static final String ACCESS_TOKEN = "accessToken";
    private static final String REFRESH_TOKEN = "refreshToken";
    private static final String PATH = "/";


    public Cookie createAccessToken(String clientSub) {

        int expiredSecond = 1800;
        int expiredTime = expiredSecond * 1000;

        return makeCookie(ACCESS_TOKEN, Jwts.builder()
            .setSubject(clientSub)
            .setExpiration(new Date(System.currentTimeMillis() + expiredTime))
            .signWith(KEY).compact(), expiredSecond);
    }

    public Cookie createRefreshToken() {

        int expiredSecond = 1209600;
        int expiredTime = expiredSecond * 1000;

        return makeCookie(REFRESH_TOKEN, Jwts.builder()
            .setExpiration(new Date(System.currentTimeMillis() + expiredTime))
            .signWith(KEY).compact(), expiredSecond);
    }

    /**
     * @param token 쿠키로 받은 토큰
     * @return clientSub
     */
    public String validateToken(String token) throws RuntimeException {
        // TODO ExpiredJwtException Advice 만들기
        return Jwts.parserBuilder()
            .setSigningKey(KEY)
            .build()
            .parseClaimsJws(token)
            .getBody()
            .getSubject();
    }

    private Cookie makeCookie(String tokenType, String token, int expiredTime) {
        Cookie tokenCookie = new Cookie(tokenType, token);
        tokenCookie.setPath(PATH);
        tokenCookie.setMaxAge(expiredTime);
        tokenCookie.setDomain("nevvel.net");
        tokenCookie.setHttpOnly(REFRESH_TOKEN.equals(tokenType));

        return tokenCookie;
    }

    public Cookie createEmptyCookie(String tokenType) {

        return makeCookie(tokenType, "", 0);
    }

    public static String getAccessToken() {
        return ACCESS_TOKEN;
    }

    public static String getRefreshToken() {
        return REFRESH_TOKEN;
    }
}
