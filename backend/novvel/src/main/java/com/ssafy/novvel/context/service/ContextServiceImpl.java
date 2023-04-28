package com.ssafy.novvel.context.service;

import com.ssafy.novvel.asset.entity.Asset;
import com.ssafy.novvel.context.dto.ContextTouchsDto;
import com.ssafy.novvel.context.entity.Context;
import com.ssafy.novvel.context.repository.ContextRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ContextServiceImpl implements ContextService{

    private final ContextRepository contextRepository;

    @Override
    @Transactional
    public ObjectId createContext(List<ContextTouchsDto> contextList) {

        Context context = contextRepository.save(new Context(contextList));

        return context.getId();
    }
}
