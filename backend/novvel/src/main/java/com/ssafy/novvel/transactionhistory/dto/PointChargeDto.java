package com.ssafy.novvel.transactionhistory.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class PointChargeDto {

    @NotNull
    private String impNum;

    @NotNull
    private String midNum;
}
