package com.ssafy.novvel.episode.service;

import com.ssafy.novvel.asset.entity.AssetType;
import com.ssafy.novvel.context.dto.ContextAffectInfoDto;
import com.ssafy.novvel.context.dto.ContextTouchsDto;
import com.ssafy.novvel.context.service.ContextService;
import com.ssafy.novvel.cover.entity.Cover;
import com.ssafy.novvel.cover.entity.PurchasedCover;
import com.ssafy.novvel.cover.repository.CoverRepository;
import com.ssafy.novvel.cover.repository.PurchasedCoverRepository;
import com.ssafy.novvel.episode.dto.*;
import com.ssafy.novvel.episode.entity.Episode;
import com.ssafy.novvel.context.entity.Context;
import com.ssafy.novvel.context.repository.ContextRepository;
import com.ssafy.novvel.episode.entity.EpisodeStatusType;
import com.ssafy.novvel.episode.entity.ReadEpisode;
import com.ssafy.novvel.episode.repository.EpisodeRepository;
import com.ssafy.novvel.episode.repository.ReadEpisodeRepository;
import com.ssafy.novvel.exception.BadRequestException;
import com.ssafy.novvel.exception.NotFoundException;
import com.ssafy.novvel.exception.NotYourAuthorizationException;
import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.member.repository.MemberRepository;
import com.ssafy.novvel.memberasset.entity.MemberAsset;
import com.ssafy.novvel.memberasset.repository.MemberAssetRepository;
import com.ssafy.novvel.transactionhistory.entity.PointChangeType;
import com.ssafy.novvel.transactionhistory.entity.TransactionHistory;
import com.ssafy.novvel.transactionhistory.repository.TransactionHistoryRepository;
import lombok.RequiredArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
public class EpisodeServiceImpl implements EpisodeService{

    private final EpisodeRepository episodeRepository;
    private final ContextRepository contextRepository;
    private final CoverRepository coverRepository;
    private final ContextService contextService;
    private final MemberAssetRepository memberAssetRepository;
    private final MemberRepository memberRepository;
    private final TransactionHistoryRepository historyRepository;
    private final ReadEpisodeRepository readEpisodeRepository;
    private final PurchasedCoverRepository purchasedCoverRepository;

    @Override
    @Transactional
    public Long createEpisode(EpisodeRegistDto episodeRegistDto, Member member) {
        Cover cover = coverRepository.findById(episodeRegistDto.getCoverId()).orElseThrow(
                () -> new NotFoundException("시리즈가 없습니다."));

        //현재 로그인 유저가 cover 작성자인지 확인
        if (!cover.getMember().getId().equals(member.getId())){
            // 본인이 작성한 소설의 에피소드만 작성할 수 있습니다.
            throw new NotYourAuthorizationException("현재 사용자가 시리즈(Cover) 작성자와 다른 사람입니다.");
        }

        myAssetCheck(episodeRegistDto, member);

        ObjectId contextId = contextService.createContext(episodeRegistDto.getContents());

        if (episodeRegistDto.isReservation()) {
            Episode episode = episodeRepository.save(new Episode(cover, episodeRegistDto, episodeRegistDto.getReservationTime(), contextId));
            return episode.getId();
        }

        Episode episode = episodeRepository.save(new Episode(cover, episodeRegistDto, contextId));
        return episode.getId();
    }

    @Transactional
    public EpisodeContextDto getEpisodeInfo(Long episodeId, Member member) {
        Episode episode = episodeRepository.findById(episodeId).orElseThrow(
                () -> new NotFoundException("Episode가 없습니다."));

        Cover cover = coverRepository.findById(episode.getCover().getId()).orElseThrow(
                () -> new NotFoundException("시리즈가 없습니다."));

        // 현재 유저가 에피소드의 작성자인지 -> 아니라면 구매자인지 확인
        if (!episode.getCover().getMember().getId().equals(member.getId())) {
            // 발행 상태거나 삭제되었어도 구매한 것일 땐 볼 수 있음.
            if (!episode.getStatusType().equals(EpisodeStatusType.TEMPORARY)) {
                Optional<TransactionHistory> transactionHistory = historyRepository.findByMemberAndEpisode(member, episode);
                // 거래 내역이 없을 때
                if (transactionHistory.isEmpty()) {
                    // 삭제된 에피소드면 못봄
                    if (episode.getStatusType().equals(EpisodeStatusType.DELETED)) {
                        throw new NotYourAuthorizationException("삭제된 episode입니다.");
                    }
                    // 유료 에피소드면 못봄
                    if (episode.getPoint() > 0) {
                        throw new NotYourAuthorizationException("구매하지 않은 episode입니다.");
                    }
                }
            } else {
                throw new NotYourAuthorizationException("발행되지 않은 episode입니다.");
            }
        } else {
            // 본인 거면 삭제했을 때만 접근 불가
            if (episode.getStatusType().equals(EpisodeStatusType.DELETED)) {
                throw new NotYourAuthorizationException("삭제된 episode입니다.");
            }
        }

        // 에러 뜨면 MongoDB 연결 확인
        Context context = contextRepository.findById(episode.getContextId()).orElseThrow(
                () -> new NotFoundException("Context가 없습니다(MongoDB 로직 수정 필요)."));

        // 현재 유저가 작성자가 아닐 때만 조회수 1 올리기
        if (!episode.getCover().getMember().getId().equals(member.getId())) {
            episode.setViewCount(episode.getViewCount() + 1);
        }

        // 읽은 소설 처리하기
        readEpisodeRepository.save(new ReadEpisode(episode, member));

        return new EpisodeContextDto(cover.getId(), cover.getTitle(), episode.getTitle(), episode.getId(), context.getContents(),
                episodeRepository.findPrevEpisodeId(episodeId, cover), episodeRepository.findNextEpisodeId(episodeId, cover));
    }

    @Override
    @Transactional
    public void deleteEpisode(Long episodeId, Long memberId) {
        Episode episode = episodeRepository.findById(episodeId).orElseThrow(
                () -> new NotFoundException("episode가 없습니다."));

        // 현재 유저가 에피소드 작성자인지 확인하는 작업 필요
        if (!episode.getCover().getMember().getId().equals(memberId)) {
            throw new NotYourAuthorizationException("현재 사용자가 시리즈(Cover) 작성자와 다른 사람입니다.");
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
                () -> new NotFoundException("episode가 없습니다."));
        Cover cover = coverRepository.findById(episodeRegistDto.getCoverId()).orElseThrow(
                () -> new NotFoundException("시리즈가 없습니다."));
        ObjectId contextId = episode.getContextId();

//        커버 작성자와 현재 작성자 같은지 확인
        if (!cover.getMember().getId().equals(member.getId())) {
            throw new NotYourAuthorizationException("현재 사용자가 시리즈(Cover) 작성자와 다른 사람입니다.");
        }

        if (episode.getStatusType().equals(EpisodeStatusType.DELETED)) {
            throw new NotYourAuthorizationException("삭제된 episode는 수정할 수 없습니다.");
        }

        myAssetCheck(episodeRegistDto, member);

        episode.setTitle(episodeRegistDto.getTitle());
        episode.setPoint(episodeRegistDto.getPoint());
        // 수정중인 글을 임시저장 할 경우 새로운 임시저장 글이 생길 뿐 기존 발행 or 삭제한 게시글이 임시저장 상태가 되어선 안됨
        if (episode.getStatusType().equals(EpisodeStatusType.PUBLISHED) && episodeRegistDto.getStatusType().equals(EpisodeStatusType.TEMPORARY)) {
            throw new NotYourAuthorizationException("이미 발행된 episode는 임시저장 상태로 전환할 수 없습니다.");
        }

        episode.setStatusType(episodeRegistDto.getStatusType());

        if (!episodeRegistDto.isReservation()){
            episode.setReservationTime(null);
        } else {
            episode.setReservationTime(episodeRegistDto.getReservationTime());
        }

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

    @Override
    @Transactional
    public Integer purchaseEpisode(EpisodePurchasingDto episodePurchasingDto, Member member) {
        Cover cover = coverRepository.findById(episodePurchasingDto.getCoverId()).orElseThrow(
                () -> new NotFoundException("시리즈가 없습니다."));

        Member seller = cover.getMember();
        member = memberRepository.save(member);

        List<Long> episodeIdsGet = episodePurchasingDto.getEpisodes();
        List<Long> episodeIds = new ArrayList<>();

        // 구매하려는 에피소드 목록의 id 리스트
        for (Long episodeId : episodeIdsGet) {
            if (episodeIds.contains(episodeId)) {
                throw new BadRequestException("중복된 episode를 선택하였습니다.");
            }
            episodeIds.add(episodeId);
        }

        // id 리스트를 통해 episode 목록을 받아오기
        List<Episode> episodes = episodeRepository.findByIdInIds(episodeIds);

        // id가 where in인 episode를 모은 리스트의 사이즈가 id만 있는 리스트의 사이즈보다 작다면 없는 에피소드가 값으로 들어온 것이므로
        // 진행 불가
        if (episodeIds.size() != episodes.size()) {
            throw new NotFoundException("존재하지 않는 episode가 포함되어 있습니다.");
        }

        // 에피소드들의 가격 총 합을 저장할 변수
        Long sumPoint = 0L;

        // 하나씩 돌며 cover에 속하지 않은 episode나 이미 구입한 episode가 포함되었는지 검사하며 겸사겸사 query 대신 point 직접 합산
        for (Episode episode : episodes) {
            if (!episode.getCover().getId().equals(cover.getId())){
                throw new BadRequestException(episode.getTitle() + "은(는) 해당 시리즈의 episode가 아닙니다.");
            } else sumPoint += episode.getPoint();
            if (!episode.getStatusType().equals(EpisodeStatusType.PUBLISHED)) {
                throw new BadRequestException("구매할 수 없는 episode가 포함되어 있습니다.");
            }
            Optional<TransactionHistory> transactionHistory = historyRepository.findByMemberAndEpisode(member, episode);
            if (transactionHistory.isPresent()) {
                return 204;
            }
        }

        // 구매자의 point 합이 구매하려는 에피소드의 가격 합보다 작으면 구매 불가
        if (sumPoint > member.getPoint()) {
            return 200;
        }

        for (Episode episode : episodes) {
            TransactionHistory buyTransactionHistory = new TransactionHistory(member, episode, PointChangeType.BUY_EPISODE, episode.getPoint());
            TransactionHistory sellTransactionHistory = new TransactionHistory(seller, episode, PointChangeType.SELL_EPISODE, episode.getPoint());
            member.setPoint(member.getPoint() - episode.getPoint());
            seller.setPoint(seller.getPoint() + episode.getPoint());
            historyRepository.saveAll(List.of(buyTransactionHistory, sellTransactionHistory));
        }

        purchasedCoverRepository.save(new PurchasedCover(cover, member));

        return 201;
    }

    @Override
    public Page<EpisodePurchasedOnDto> getPurchasedOnEp(Member member, Pageable pageable) {
        Page<EpisodePurchasedOnDto> episodePurchasedPage = historyRepository.findByMemberAndEpisodeNotNull(member, pageable);
        List<EpisodePurchasedOnDto> episodePurchasedOnDtoList = episodePurchasedPage.getContent();

        return new PageImpl<>(episodePurchasedOnDtoList, pageable, episodePurchasedPage.getTotalElements());
    }

    @Override
    @Transactional
    public void reservationPublished() {
        List<Episode> episodes = episodeRepository.findByReservationTimeBefore(LocalDateTime.now());
        if (!episodes.isEmpty()) {
            for (Episode episode : episodes) {
                episode.setStatusType(EpisodeStatusType.PUBLISHED);
                episode.setReservationTime(null);
            }
        }
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
                        throw new BadRequestException("이미 IMAGE를 1회 사용했습니다.");
                    }
                } else if (contextAffect.getType().equals(AssetType.AUDIO)) {
                    if (!audio) {
                        audio = true;
                        episodeAssetIdSet.add(contextAffect.getAssetId());
                    } else {
                        throw new BadRequestException("이미 AUDIO를 1회 사용했습니다.");
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
                throw new NotYourAuthorizationException("소지하지 않은 asset을 사용하였습니다.");
            }
        }
    }
}

