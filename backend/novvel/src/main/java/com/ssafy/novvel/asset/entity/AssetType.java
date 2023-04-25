package com.ssafy.novvel.asset.entity;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public enum AssetType {
    AUDIO("AUDIO"), IMAGE("IMAGE");

    private final String description;
}
