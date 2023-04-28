package com.ssafy.novvel.cover.entity;

import com.ssafy.novvel.member.entity.Member;
import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
public class CoverMemberID implements Serializable {

    private Cover cover;
    private Member member;
}
