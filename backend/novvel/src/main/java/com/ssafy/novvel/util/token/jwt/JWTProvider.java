package com.ssafy.novvel.util.token.jwt;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import org.springframework.stereotype.Component;

@Component
public class JWTProvider {
    private final Key KEY = Keys.secretKeyFor(SignatureAlgorithm.HS256);

    public String createAccessToken(String clientSub) {
        int accessTokenExpiredTime = 1800000;
        return Jwts.builder()
            .setSubject(clientSub)
            .setExpiration(new Date(System.currentTimeMillis() + accessTokenExpiredTime))
            .signWith(KEY).compact();
    }

    public String createRefreshToken() {
        Calendar expiredDate = Calendar.getInstance();
        expiredDate.add(Calendar.DAY_OF_MONTH, 14);

        return Jwts.builder()
            .setExpiration(expiredDate.getTime())
            .signWith(KEY).compact();
    }

    /**
     *
     * @param token 쿠키로 받은 토큰
     * @return clientSub
     */
    public String validateToken(String token) throws ExpiredJwtException {
        // TODO ExpiredJwtException Advice 만들기
        return Jwts.parserBuilder()
            .setSigningKey(KEY)
            .build()
            .parseClaimsJws(token)
            .getBody()
            .getSubject();
    }
}
