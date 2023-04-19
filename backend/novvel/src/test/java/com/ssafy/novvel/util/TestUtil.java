package com.ssafy.novvel.util;

import com.ssafy.novvel.member.entity.Member;

public class TestUtil {

    public static Member getMember(){
        return Member.builder()
                .id(1L)
                .email("email@naver.com")
                .nickname("nickname")
                .point(0L)
                .build();
    }


}
