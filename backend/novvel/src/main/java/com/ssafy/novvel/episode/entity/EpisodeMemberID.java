package com.ssafy.novvel.episode.entity;

import com.ssafy.novvel.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.io.Serializable;

@NoArgsConstructor
@AllArgsConstructor
public class EpisodeMemberID implements Serializable {

    private Long episode;
    private Long member;
}
