package com.ssafy.novvel.sign;

public enum CustomUserInfo {
    CLIENT_SUB("clientSub");

    private final String value;

    CustomUserInfo(String value) {
        this.value = value;
    }

    public String getValue() {
        return this.value;
    }

}
