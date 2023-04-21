package com.ssafy.novvel.episode.entity;

import com.ssafy.novvel.memberasset.entity.MemberAsset;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.validation.constraints.NotNull;

@Entity
@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class BlockAsset {
    @Id
    private Long id;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @NotNull
    private Block block;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @NotNull
    private MemberAsset memberAsset;

    @Setter
    private String effect;
}
