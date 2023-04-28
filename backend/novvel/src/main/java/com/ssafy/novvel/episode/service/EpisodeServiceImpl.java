package com.ssafy.novvel.episode.service;

import com.ssafy.novvel.asset.entity.AssetType;
import com.ssafy.novvel.context.dto.ContextAffectInfoDto;
import com.ssafy.novvel.context.dto.ContextTouchsDto;
import com.ssafy.novvel.context.service.ContextService;
import com.ssafy.novvel.cover.entity.Cover;
import com.ssafy.novvel.cover.repository.CoverRepository;
import com.ssafy.novvel.episode.dto.EpisodeContextDto;
import com.ssafy.novvel.episode.dto.EpisodeRegistDto;
import com.ssafy.novvel.episode.entity.Episode;
import com.ssafy.novvel.context.entity.Context;
import com.ssafy.novvel.context.repository.ContextRepository;
import com.ssafy.novvel.episode.repository.EpisodeRepository;
import com.ssafy.novvel.exception.NotFoundException;
import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.memberasset.entity.MemberAsset;
import com.ssafy.novvel.memberasset.repository.MemberAssetRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.*;

@Service
@RequiredArgsConstructor
public class EpisodeServiceImpl implements EpisodeService{

    private final EpisodeRepository episodeRepository;
    private final ContextRepository contextRepository;
    private final CoverRepository coverRepository;
    private final ContextService contextService;
    private final MemberAssetRepository memberAssetRepository;

    @Override
    @Transactional
    public Long createEpisode(EpisodeRegistDto episodeRegistDto, Member member) {
        Cover cover = coverRepository.findById(episodeRegistDto.getCoverId()).orElseThrow(
                () -> new NotFoundException("시리즈가 없습니다."));

        //현재 로그인 유저가 cover 작성자인지 확인
        if (!cover.getMember().getId().equals(member.getId())){
            // 본인이 작성한 소설의 에피소드만 작성할 수 있습니다.
            throw new NotFoundException("현재 사용자가 시리즈(Cover) 작성자와 다른 사람입니다.");
        }

        myAssetCheck(episodeRegistDto, member);

        ObjectId contextId = contextService.createContext(episodeRegistDto.getContents());

        Episode episode = episodeRepository.save(new Episode(cover, episodeRegistDto, contextId));
        return episode.getId();
    }

    @Transactional
    public EpisodeContextDto getEpisodeInfo(Long episodeId, Long memberId) {
        Episode episode = episodeRepository.findById(episodeId).orElseThrow(
                () -> new NotFoundException("Episode가 없습니다."));

        // 결제 관련 활성화 시 현재 유저가 에피소드를 구매한 유저가 맞는지 확인하는 로직 필요

        // 에러 뜨면 MongoDB 연결 확인
        Context context = contextRepository.findById(episode.getContextId()).orElseThrow(
                () -> new NotFoundException("Context가 없습니다(MongoDB 로직 수정 필요)."));

        // 현재 유저가 작성자가 아닐 때만 조회수 1 올리기
        if (!episode.getCover().getMember().getId().equals(memberId)) {
            episode.setViewCount(episode.getViewCount() + 1);
        }
        return new EpisodeContextDto(episode.getId(), context.getContents());
    }

    @Override
    @Transactional
    public void deleteEpisode(Long episodeId, Long memberId) {
        Episode episode = episodeRepository.findById(episodeId).orElseThrow(
                () -> new NotFoundException("Episode가 없습니다."));

        // 현재 유저가 에피소드 작성자인지 확인하는 작업 필요
        if (!episode.getCover().getMember().getId().equals(memberId)) {
            throw new NotFoundException("현재 사용자가 시리즈(Cover) 작성자와 다른 사람입니다.");
        }
        Context context = contextRepository.findById(episode.getContextId()).orElseThrow(
                () -> new NotFoundException("Context가 없습니다(MongoDB 로직 수정 필요)."));
        contextRepository.delete(context);
        episodeRepository.delete(episode);
    }

    @Override
    @Transactional
    public void updateEpisode(Long episodeId, EpisodeRegistDto episodeRegistDto, Member member) {
        Episode episode = episodeRepository.findById(episodeId).orElseThrow(
                () -> new NotFoundException("Episode가 없습니다."));
        Cover cover = coverRepository.findById(episodeRegistDto.getCoverId()).orElseThrow(
                () -> new NotFoundException("시리즈가 없습니다."));
        ObjectId contextId = episode.getContextId();

//        커버 작성자와 현재 작성자 같은지 확인
        if (!cover.getMember().getId().equals(member.getId())) {
            throw new NotFoundException("현재 사용자가 시리즈(Cover) 작성자와 다른 사람입니다.");
        }

        myAssetCheck(episodeRegistDto, member);

        episode.setPoint(episodeRegistDto.getPoint());
        episode.setStatusType(episodeRegistDto.getStatusType());

        // 에러 뜨면 MongoDB 연결 확인
        Context context = contextRepository.findById(contextId).orElseThrow(
                () -> new NotFoundException("Context가 없습니다(MongoDB 로직 수정 필요)."));

        // 새롭게 Context를 생성(수정 결과값)
        ObjectId newContextId = contextService.createContext(episodeRegistDto.getContents());

        // 기존 Context를 삭제하고,
        contextRepository.delete(context);

        // episode의 ContextId를 새로 만든(수경결과) Context의 Id로 변경
        episode.setContextId(newContextId);
    }

    // episodeRegistDto(수정 or 새로 생성 시 사용) 넣으면 context 돌며 effect 돌며 모든 myAssetId 받아와
    // 하나의 배열에 저장 후 해당 배열의 요소들이 memberAsset 테이블에서 내가 가진 에셋 목록에 있는 것과
    // 같은지 확인하는 로직
    private void myAssetCheck(EpisodeRegistDto episodeRegistDto, Member member) {
        // 이 에피소드에 쓰인 asset Id Set
        Set<Long> episodeAssetIdSet = new HashSet<>();
        // 유저가 가진 asset Id Set
        Set<Long> memberAssetIdSet = new HashSet<>();

        // 에피소드의 터치 단위 싹 다 가져온 List
        List<ContextTouchsDto> contextList = episodeRegistDto.getContents();
        // 멤버가 가진 에셋 목록 테이블의 멤버를 통한 검색 값 List
        List<MemberAsset> memberAssets = memberAssetRepository.findByMember(member);

        // 에피소드 터치 단위 속 이펙트 속 사용 asset id만 꺼내와서 episodeAssetIdSet에 담기
        for (ContextTouchsDto context : contextList) {
            List<ContextAffectInfoDto> contextAffectList = context.getEvent();
            boolean image = false;
            boolean audio = false;
            for (ContextAffectInfoDto contextAffect : contextAffectList) {
                if (contextAffect.getType().equals(AssetType.IMAGE)) {
                    if (!image) {
                        image = true;
                        episodeAssetIdSet.add(contextAffect.getAssetId());
                    } else {
                        throw new NotFoundException("이미 IMAGE를 1회 사용했습니다.");
                    }
                } else if (contextAffect.getType().equals(AssetType.AUDIO)) {
                    if (!audio) {
                        audio = true;
                        episodeAssetIdSet.add(contextAffect.getAssetId());
                    } else {
                        throw new NotFoundException("이미 AUDIO를 1회 사용했습니다.");
                    }
                }
            }
        }

        // 멤버가 가진 에셋 목록에서 asset id만 꺼내와서 memberAssetIdSet에 담기
        for (MemberAsset memberAsset : memberAssets) {
            memberAssetIdSet.add(memberAsset.getAsset().getId());
        }

        for (Long episodeAsset : episodeAssetIdSet) {
            if (!memberAssetIdSet.contains(episodeAsset)) {
                throw new NotFoundException("소지하지 않은 asset을 사용하였습니다.");
            }
        }
    }
}

