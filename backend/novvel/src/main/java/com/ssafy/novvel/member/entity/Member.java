package com.ssafy.novvel.member.entity;

import com.ssafy.novvel.resource.entity.Resource;
import com.ssafy.novvel.util.BaseEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    private Resource profile;

    @NotBlank
    @Size(min = 4, max = 20)
    private String nickname;

    @Email
    private String email;

    @PositiveOrZero
    private Long point;






}
