package com.ssafy.novvel.member.dto.response;

import javax.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberDescriptionDto {
    @Size(max = 500)
    private String description;

}
