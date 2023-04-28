package com.ssafy.novvel.memberasset.entity;

import com.ssafy.novvel.asset.entity.Asset;
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
public class MemberAsset extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @Setter
    @NotNull
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY)
    @Setter
    @NotNull
    private Asset asset;

    @Setter
    @Enumerated(EnumType.STRING)
    @NotNull
    private DealType type;

    public MemberAsset(Member member, Asset asset, DealType dealType){
        this.member =member;
        this.asset = asset;
        this.type =dealType;
    }
}
