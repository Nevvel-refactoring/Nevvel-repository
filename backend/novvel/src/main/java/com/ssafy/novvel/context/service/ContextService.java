package com.ssafy.novvel.context.service;

import com.ssafy.novvel.context.dto.ContextTouchsDto;
import org.bson.types.ObjectId;

import java.util.List;

public interface ContextService {
    ObjectId createContext(List<ContextTouchsDto> contextList);
}
