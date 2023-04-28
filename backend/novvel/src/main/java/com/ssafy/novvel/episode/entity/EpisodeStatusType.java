package com.ssafy.novvel.episode.entity;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum EpisodeStatusType {
    // 발행함, 임시저장, 삭제함
    PUBLISHED("PUBLISHED"), TEMPORARY("TEMPORARY"), DELETED("DELETED");

    private final String value;
}
