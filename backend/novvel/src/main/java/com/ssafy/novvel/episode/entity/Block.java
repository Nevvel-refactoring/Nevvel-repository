package com.ssafy.novvel.episode.entity;

import com.ssafy.novvel.episode.entity.Episode;
import com.ssafy.novvel.util.BaseEntity;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Block extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Setter
    @ManyToOne(fetch = FetchType.LAZY)
    @NotNull
    private Episode episode;

    @Setter
    @NotNull
    private Long idx;

    @Setter
    private String context;
}
