package com.ssafy.novvel.episode.entity;

import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.util.BaseEntity;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@IdClass(EpisodeMemberID.class)
public class ReadEpisode extends BaseEntity {
    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @NotNull
    @Setter
    private Episode episode;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @NotNull
    @Setter
    private Member member;
}
