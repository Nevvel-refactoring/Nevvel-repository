package com.ssafy.novvel.transactionhistory.entity;

import com.ssafy.novvel.asset.entity.Asset;
import com.ssafy.novvel.episode.entity.Episode;
import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.util.BaseEntity;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;


@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class TransactionHistory extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @Setter
    @NotNull
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @Setter
    private Asset asset;

    @ManyToOne(fetch = FetchType.LAZY)
    @Setter
    private Episode episode;

    @Enumerated(EnumType.STRING)
    @Setter
    @Column(name = "type")
    @NotNull
    private PointChangeType pointChangeType;

    @Setter
    @NotNull
    private Long point;

    public TransactionHistory(Member member, Asset asset, PointChangeType type, Long point) {
        this.member = member;
        this.asset = asset;
        this.pointChangeType = type;
        this.point = point;
    }

    public TransactionHistory(Member member, Episode episode, PointChangeType type, Long point) {
        this.member = member;
        this.episode = episode;
        this.pointChangeType = type;
        this.point = point;
    }

    public TransactionHistory(Member member, PointChangeType type, Long point) {
        this.member = member;
        this.pointChangeType = type;
        this.point = point;
    }

}
