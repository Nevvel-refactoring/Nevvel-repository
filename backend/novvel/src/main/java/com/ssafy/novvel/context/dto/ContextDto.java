package com.ssafy.novvel.context.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ContextDto {
    private String tag;
    private String text;
}
