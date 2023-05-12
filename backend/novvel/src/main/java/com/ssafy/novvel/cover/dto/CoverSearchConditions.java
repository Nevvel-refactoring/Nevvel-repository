package com.ssafy.novvel.cover.dto;

import com.ssafy.novvel.cover.entity.CoverStatusType;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
@ToString
public class CoverSearchConditions {
    @Enumerated(EnumType.STRING)
    private CoverSortType sorttype = CoverSortType.HIT;
    private Integer pageNum = 0;
    @Enumerated(EnumType.STRING)
    private CoverStatusType status = CoverStatusType.ALL;
    private Long genre = 1L;
}
