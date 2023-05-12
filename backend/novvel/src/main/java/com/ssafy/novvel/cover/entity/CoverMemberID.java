package com.ssafy.novvel.cover.entity;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class CoverMemberID implements Serializable {

    private Long cover;
    private Long member;
}
