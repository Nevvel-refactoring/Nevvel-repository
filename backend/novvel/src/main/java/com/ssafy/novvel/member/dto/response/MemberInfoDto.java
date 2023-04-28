package com.ssafy.novvel.member.dto.response;

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
    @PositiveOrZero
    private Long point;
    @NotNull
    private String profileImage;
    @NotNull
    private String nickname;
    @Size(max = 500)
    private String description;
}
