package com.ssafy.novvel.member.entity;

import com.ssafy.novvel.episode.entity.Episode;
import java.io.Serializable;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.IdClass;
import javax.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@IdClass(ReadEpisode.MemberEpisodeID.class)
@AllArgsConstructor
@Builder
public class ReadEpisode {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    private Episode episode;

    public static class MemberEpisodeID implements Serializable {
        private Member member;
        private Episode episode;
    }

}
