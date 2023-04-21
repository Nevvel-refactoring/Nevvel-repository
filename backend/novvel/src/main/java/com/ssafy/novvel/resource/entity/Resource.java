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
    @Setter
    private String url;
    private Boolean isThumbnail;
    @Setter
    private String thumbnailUrl;

    public Resource(String originName, Boolean isThumbnail) {
        this.originName = originName;
        this.isThumbnail = isThumbnail;
    }
}
