package com.ssafy.novvel.cover.dto;

import com.querydsl.core.annotations.QueryProjection;
import com.querydsl.core.types.dsl.NumberPath;
import com.querydsl.core.types.dsl.StringPath;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@Builder
public class CoverWriter {

    private Long id;
    private String nickname;

    public CoverWriter(Long id, String nickname) {
        this.id = id;
        this.nickname = nickname;
    }
}
