package com.ssafy.novvel.asset.entity;

import com.ssafy.novvel.asset.dto.AssetRegistDto;
import com.ssafy.novvel.resource.entity.Resource;
import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.util.BaseEntity;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import javax.validation.constraints.Size;


@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
@Builder
public class Asset extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    private String title;
    @OneToOne(fetch = FetchType.LAZY)
    private Resource resource;
    @ManyToOne(fetch = FetchType.LAZY)
    private Member member;
    @Enumerated(EnumType.STRING)
    private AssetType type;
    @Size(max = 500)
    private String description;
    @PositiveOrZero
    private Long point = 0L;
    @PositiveOrZero
    private Long downloadCount = 0L;

    public Asset(AssetRegistDto assetRegistDto, Resource resource, Member member) {
        this.title = assetRegistDto.getTitle();
        this.description = assetRegistDto.getDescription();
        this.point = assetRegistDto.getPoint();
        this.type = assetRegistDto.getType();
        this.resource = resource;
        this.member = member;
    }

    public Asset(String title, AssetType type, String description, Long point) {
        this.title = title;
        this.type = type;
        this.description = description;
        this.point = point;
    }

    public Asset(Long id, String title, AssetType type, String description, Long point) {
        this.id = id;
        this.title = title;
        this.type = type;
        this.description = description;
        this.point = point;
    }

    @Override
    public boolean equals(Object obj) {
        if(obj instanceof Asset){
            Asset asset = (Asset) obj;
            return this.id.equals(asset.getId());
        }
        return false;
    }
}

