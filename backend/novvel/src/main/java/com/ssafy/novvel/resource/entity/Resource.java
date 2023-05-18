package com.ssafy.novvel.resource.entity;

import com.ssafy.novvel.util.BaseEntity;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
public class Resource extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    private String originName;
    @NotNull
    private String changedName;
    private String thumbnailName;
    @NotNull
    @Setter
    private String url;
    private Boolean isThumbnail;
    @Setter
    private String thumbnailUrl;

    public Resource(String originName,String changedName, Boolean isThumbnail) {
        this.originName = originName;
        this.changedName = changedName;
        this.isThumbnail = isThumbnail;
    }

    public Resource(String originName,String changedName, String thumbnailName,Boolean isThumbnail) {
        this.originName = originName;
        this.changedName = changedName;
        this.thumbnailName = thumbnailName;
        this.isThumbnail = isThumbnail;
    }
}
