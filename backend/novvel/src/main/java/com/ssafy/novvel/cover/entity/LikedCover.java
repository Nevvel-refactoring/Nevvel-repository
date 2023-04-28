package com.ssafy.novvel.cover.entity;

import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.util.BaseEntity;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@IdClass(CoverMemberID.class)
public class LikedCover extends BaseEntity {
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @NotNull
    @Setter
    private Cover cover;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @NotNull
    @Setter
    private Member member;
}
