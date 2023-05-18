package com.ssafy.novvel.cover.entity;

public enum CoverStatusType {
    //    연재중, 완결, 삭제됨
    SERIALIZED("SERIALIZED"), FINISHED("FINISHED"), DELETED("DELETED"),
    ALL("ALL"), LATEST("LATEST");

    private final String value;

    CoverStatusType(String value) {
        this.value = value;
    }

    public String value() {
        return this.value;
    }
}
