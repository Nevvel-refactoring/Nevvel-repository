package com.ssafy.novvel.cover.entity;

import com.ssafy.novvel.cover.dto.CoverRegisterDto;
import com.ssafy.novvel.genre.entity.Genre;
import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.resource.entity.Resource;
import com.ssafy.novvel.util.BaseEntity;
import javax.validation.constraints.Size;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDate;

@Entity
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Cover extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "thumbnail_id")
    private Resource resource;

    @OneToOne
    private Genre genre;

    @ManyToOne(fetch = FetchType.LAZY)
    @NotNull
    private Member member;

    @NotNull
    private String title;

    @Size(max = 500)
    private String description;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "status_type")
    private CoverStatusType coverStatusType;

    private LocalDate publishDate;

    @NotNull
    private Long likes;

    public Cover(Resource resource, CoverRegisterDto coverRegisterDto, Member member, Genre genre) {

        this.coverStatusType = CoverStatusType.SERIALIZED;
        this.resource = resource;
        this.member = member;
        this.description = coverRegisterDto.getDescription();
        this.title = coverRegisterDto.getTitle();
        this.genre = genre;
    }
}
