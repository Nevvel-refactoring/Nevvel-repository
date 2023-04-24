package com.ssafy.novvel.util.token.jwt;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
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
        int accessTokenExpiredTime = 1800000;

        return makeCookie(ACCESS_TOKEN, Jwts.builder()
            .setSubject(clientSub)
            .setExpiration(new Date(System.currentTimeMillis() + accessTokenExpiredTime))
            .signWith(KEY).compact());
    }

    public Cookie createRefreshToken() {
        Calendar expiredDate = Calendar.getInstance();
        expiredDate.add(Calendar.DAY_OF_MONTH, 14);

        return makeCookie(REFRESH_TOKEN, Jwts.builder()
            .setExpiration(expiredDate.getTime())
            .signWith(KEY).compact());
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

    private Cookie makeCookie(String tokenType, String token) {
        Cookie tokenCookie = new Cookie(tokenType, token);
        tokenCookie.setPath(PATH);
        tokenCookie.setHttpOnly(true);

        return tokenCookie;
    }

    public static String getAccessToken() {
        return ACCESS_TOKEN;
    }

    public static String getRefreshToken() {
        return REFRESH_TOKEN;
    }
}
