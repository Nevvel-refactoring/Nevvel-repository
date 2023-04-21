package com.ssafy.novvel.transactionhistory.entity;

import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.util.BaseEntity;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TransactionHistory extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;

    @Enumerated(EnumType.STRING)
    private PointChangeType pointChangeType;

    private Long poin;

}
