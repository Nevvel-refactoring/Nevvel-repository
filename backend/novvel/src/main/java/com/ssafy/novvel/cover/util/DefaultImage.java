package com.ssafy.novvel.cover.util;

import javax.annotation.PostConstruct;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Slf4j
@Component
public class DefaultImage {
    @Value("${proxy.url}")
    private String url;

    private static String[] genre = {"전체", "로맨스", "로맨스 판타지", "판타지", "현대 판타지", "무협", "호러/미스터리",
        "라이트노벨", "BL", "자유"};

    @PostConstruct
    public void initialize() {
        log.info(url);
    }


    public String getImageByGenreName(String genreName) {
        for(String s : genre) {
            if(s.equals(genreName)) {
                return this.url + "/default/cover/"+ s + ".jpg";
            }
        }
        return url + "/default/cover/자유.jpg";
    }

    public String getImageByGenreId(Long genreId) {
        return getImageByGenreName(genre[genreId.intValue() - 1]);
    }

}
