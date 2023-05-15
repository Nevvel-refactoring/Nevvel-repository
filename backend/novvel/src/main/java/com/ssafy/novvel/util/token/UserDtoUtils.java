package com.ssafy.novvel.util.token;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.ssafy.novvel.member.dto.response.MemberInfoDto;
import com.ssafy.novvel.member.entity.Member;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import javax.servlet.http.Cookie;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class UserDtoUtils {

    @Value("${proxy.url}")
    private String url;

    public static final String USER_DTO = "userDto";

    public String convertEntityToJSONDto(Member member) {
        String userDto;

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            userDto = objectMapper.writeValueAsString(new MemberInfoDto(member, url));
        } catch (JsonProcessingException e) {
            userDto = "";
        }

        userDto = URLEncoder.encode(userDto, StandardCharsets.UTF_8);
        return userDto;
    }

    public Cookie createUserDtoCookie(String encodedMemberInfoDto, int expiredTime) {

        Cookie cookie = new Cookie(USER_DTO, encodedMemberInfoDto);
        cookie.setPath("/");
        cookie.setMaxAge(expiredTime);
        return cookie;
    }

    public Cookie createUserDtoCookie(Member member, int expiredTime) {

        Cookie cookie = new Cookie(USER_DTO, convertEntityToJSONDto(member));
        cookie.setPath("/");
        cookie.setMaxAge(expiredTime);
        return cookie;
    }

    public Cookie removeUserDtoCookie() {
        Cookie cookie = new Cookie(USER_DTO, "");
        cookie.setPath("/");
        cookie.setMaxAge(0);
        return cookie;
    }

}
