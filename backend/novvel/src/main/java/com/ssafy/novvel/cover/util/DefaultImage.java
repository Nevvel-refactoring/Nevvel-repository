package com.ssafy.novvel.cover.util;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class DefaultImage {

    @Value("${proxy.url}")
    private String url;

    private final String[] genre = {
        "전체", "로맨스", "로맨스 판타지", "판타지", "현대 판타지", "무협", "호러/미스터리", "라이트노벨", "BL", "자유"
    };

    public String getImageByGenreName(String genreName) {
        for(String s : genre) {
            if(s.equals(genreName)) {
                return url + "/default/cover/" + s + ".jpg";
            }
        }
        return url + "/default/cover/자유.jpg";
    }

}
