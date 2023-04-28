package com.ssafy.novvel.asset.entity;

import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class Tag {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String tagName;

    @Setter
    private Long useCount = 0L;

    public Tag(String tagName) {
        this.tagName = tagName;
    }

    public Tag(Long id, String tagName) {
        this.id = id;
        this.tagName = tagName;
    }
}
