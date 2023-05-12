package com.ssafy.novvel.cover.repository;

import com.ssafy.novvel.cover.dto.CoverSearchConditions;
import com.ssafy.novvel.cover.dto.CoverWithConditions;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface CoverRepositoryCustom {

    Page<CoverWithConditions> searchCover(CoverSearchConditions coverSearchConditions,
        Pageable pageable);
}
