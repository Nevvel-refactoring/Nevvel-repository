package com.ssafy.novvel.asset.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
public class AssetTag {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    private Asset asset;

    @ManyToOne(fetch = FetchType.LAZY)
    private Tag tag;

    public AssetTag(Asset asset, Tag tag) {
        this.asset = asset;
        this.tag = tag;
    }
}
