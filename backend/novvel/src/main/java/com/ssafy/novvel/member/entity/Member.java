package com.ssafy.novvel.member.entity;

import com.ssafy.novvel.resource.entity.Resource;
import com.ssafy.novvel.util.BaseEntity;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
public class Member extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    private Resource profile;

    @Size(min = 4, max = 20)
    private String nickname;

    @Email
    private String email;

    private String sub;

    private String role;

    @Size(max = 500)
    private String description;

    private String refreshToken;

    @PositiveOrZero
    private Long point;


    public void removeToken() {
        this.refreshToken = null;
    }

    public void updateToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }
}
