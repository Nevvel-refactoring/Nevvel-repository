package com.ssafy.novvel.member.dto.response;

import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.resource.entity.Resource;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Setter
public class MemberChanged {

    private Member member;
    private Resource removedResource;

}
