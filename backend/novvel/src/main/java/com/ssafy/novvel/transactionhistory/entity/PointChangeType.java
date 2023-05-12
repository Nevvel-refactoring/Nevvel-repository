package com.ssafy.novvel.transactionhistory.entity;

public enum PointChangeType {
    BUY_EPISODE("BUY_EPISODE"), SELL_EPISODE("SELL_EPISODE"), BUY_ASSET("BUY_ASSET"), SELL_ASSET(
        "SELL_ASSET"), POINT_CHARGE("POINT_CHARGE"), POINT_WITHDRAW("POINT_WITHDRAW");

    private final String value;


    PointChangeType(String value) {
        this.value = value;
    }

    public String value() {
        return value;
    }
}
