package com.ssafy.novvel.cover.entity;

import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.util.BaseEntity;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.io.Serializable;

@Entity
@Getter
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@IdClass(PurchasedCover.PurchasedCoverID.class)
public class PurchasedCover extends BaseEntity {
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

    public static class PurchasedCoverID implements Serializable {
        private Cover cover;
        private Member member;
    }
}
