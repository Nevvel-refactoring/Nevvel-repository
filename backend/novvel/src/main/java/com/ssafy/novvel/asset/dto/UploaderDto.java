package com.ssafy.novvel.asset.dto;

import com.ssafy.novvel.member.entity.Member;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class UploaderDto {
    private Long id;
    private String nickname;
    private String profileImage;

    public UploaderDto(Member member) {
        this.id = member.getId();
        this.nickname = member.getNickname();
        this.profileImage = (member.getProfile() != null) ? member.getProfile().getUrl() : "";
    }
}
