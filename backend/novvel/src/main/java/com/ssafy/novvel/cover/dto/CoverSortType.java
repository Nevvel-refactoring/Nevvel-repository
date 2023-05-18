package com.ssafy.novvel.cover.dto;

public enum CoverSortType {
    // 조회순, 좋아요순, 날짜순
    hit("hit"), like("like"), date("date");

    private final String value;

    CoverSortType(String value) {
        this.value = value;
    }

    public String value() {
        return this.value;
    }
}
