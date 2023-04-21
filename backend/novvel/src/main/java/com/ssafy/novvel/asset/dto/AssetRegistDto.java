package com.ssafy.novvel.asset.dto;

import com.ssafy.novvel.asset.entity.AssetType;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import javax.validation.constraints.Size;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AssetRegistDto {
    @NotNull
    private AssetType type;

    @NotNull
    private String title;
    @Size(max = 500)
    private String description;
    @PositiveOrZero
    private Long point;

    private List<String> tags;
}
