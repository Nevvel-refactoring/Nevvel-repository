package com.ssafy.novvel.member.dto.response;

import com.ssafy.novvel.member.entity.Member;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberInfoDto {
    @NotNull
    private Long id;
    @PositiveOrZero
    private Long point;
    @NotNull
    private String profileImage;
    @NotNull
    private String nickname;

    public MemberInfoDto(Member member, String url) {
        this.id = member.getId();
        this.profileImage = member.getProfile() == null ? url+"/default/profile/default_profile.jpg" : member.getProfile().getThumbnailUrl();
        this.nickname = member.getNickname();
        this.point = member.getPoint();
    }
}
