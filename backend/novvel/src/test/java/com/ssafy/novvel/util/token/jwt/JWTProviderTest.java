package com.ssafy.novvel.util.token.jwt;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import java.lang.reflect.Field;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import javax.servlet.http.Cookie;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeAll;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

class JWTProviderTest {


    private static JWTProvider jwtProvider;
    private static Key KEY;
    private static String clientSub;

    @BeforeAll
    @Test
    static void init() throws NoSuchFieldException, IllegalAccessException {
        jwtProvider = new JWTProvider();

        Field key = jwtProvider.getClass().getDeclaredField("KEY");
        key.setAccessible(true);
        KEY = (Key) key.get(jwtProvider);

        clientSub = "clientSub";
    }

    @Test
    void createAccessToken() {

        // given
        Cookie expect = new Cookie(JWTProvider.getAccessToken(), Jwts.builder()
            .setSubject(clientSub)
            .setExpiration(new Date(System.currentTimeMillis() + 1800000))
            .signWith(KEY).compact());

        // when
        Cookie result = jwtProvider.createAccessToken(clientSub);

        // then
        Assertions.assertThat(result.getName()).isEqualTo(expect.getName());
        Assertions.assertThat(result.getValue()).isEqualTo(expect.getValue());
    }

    @Test
    void createRefreshToken() {

        // given
        Calendar expiredDate = Calendar.getInstance();
        expiredDate.add(Calendar.DAY_OF_MONTH, 14);

        Cookie expect = new Cookie(JWTProvider.getRefreshToken(), Jwts.builder()
            .setExpiration(expiredDate.getTime())
            .signWith(KEY).compact());

        // when
        Cookie result = jwtProvider.createRefreshToken();

        // then
        Assertions.assertThat(result.getName()).isEqualTo(expect.getName());
        Assertions.assertThat(result.getValue()).isEqualTo(expect.getValue());
    }

    @Test()
    void validateExpiredToken() {

        // given
        String accessToken = Jwts.builder()
            .setSubject(clientSub)
            .setExpiration(new Date(System.currentTimeMillis() - 100))
            .signWith(KEY).compact();

        // then
        Assertions.assertThatThrownBy(() -> jwtProvider.validateToken(accessToken))
            .isInstanceOf(ExpiredJwtException.class);
    }

    @Test()
    void validateAccessToken() {

        // given
        String accessToken = Jwts.builder()
            .setSubject(clientSub)
            .setExpiration(new Date(System.currentTimeMillis() + 1800000))
            .signWith(KEY).compact();

        String result = jwtProvider.validateToken(accessToken);

        // then
        Assertions.assertThat(result).isEqualTo(clientSub);
    }

    @Test()
    void validateInvalidToken() {

        // given
        Key key = Keys.secretKeyFor(SignatureAlgorithm.HS512);

        String refreshToken = Jwts.builder()
            .setExpiration(new Date(System.currentTimeMillis() - 1800000))
            .signWith(key).compact();

        // then
        Assertions.assertThatThrownBy(() -> jwtProvider.validateToken(refreshToken))
            .isInstanceOf(RuntimeException.class);
    }

    @Test
    void createEmptyCookie() {

        // given
        Cookie expect = new Cookie(JWTProvider.getAccessToken(), "");
        expect.setHttpOnly(true);
        expect.setPath("/");
        expect.setMaxAge(0);

        // when
        Cookie result = jwtProvider.createEmptyCookie(JWTProvider.getAccessToken());

        // then
        Assertions.assertThat(result.getName()).isEqualTo(expect.getName());
        Assertions.assertThat(result.getPath()).isEqualTo(expect.getPath());
        Assertions.assertThat(result.getMaxAge()).isEqualTo(expect.getMaxAge());
    }
}