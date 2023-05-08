package com.ssafy.novvel.asset.service;

import com.ssafy.novvel.asset.dto.AssetFilterDto;
import com.ssafy.novvel.asset.dto.AssetRegistDto;
import com.ssafy.novvel.asset.dto.AssetSearchDto;
import com.ssafy.novvel.asset.entity.Asset;
import com.ssafy.novvel.asset.entity.AssetTag;
import com.ssafy.novvel.asset.entity.Tag;
import com.ssafy.novvel.asset.repository.AssetRepository;
import com.ssafy.novvel.asset.repository.AssetTagRepository;
import com.ssafy.novvel.asset.repository.TagRepository;
import com.ssafy.novvel.exception.NotFoundException;
import com.ssafy.novvel.exception.NotYourAuthorizationException;
import com.ssafy.novvel.member.repository.MemberRepository;
import com.ssafy.novvel.memberasset.entity.DealType;
import com.ssafy.novvel.memberasset.entity.MemberAsset;
import com.ssafy.novvel.memberasset.repository.MemberAssetRepository;
import com.ssafy.novvel.resource.entity.Resource;
import com.ssafy.novvel.resource.service.ResourceService;
import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.transactionhistory.entity.PointChangeType;
import com.ssafy.novvel.transactionhistory.entity.TransactionHistory;
import com.ssafy.novvel.transactionhistory.repository.TransactionHistoryRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class AssetServiceImpl implements AssetService {

    private final AssetRepository assetRepository;
    private final AssetTagRepository assetTagRepository;
    private final TagRepository tagRepository;
    private final ResourceService resourceService;
    private final MemberAssetRepository memberAssetRepository;
    private final MemberRepository memberRepository;
    private final TransactionHistoryRepository historyRepository;

    @Override
    @Transactional
    public Asset addAsset(MultipartFile multipartFile, Member member, AssetRegistDto assetRegistDto) throws IOException {
        //멀티파트 파일을 저장, Resource에 기록
        Resource resource = resourceService.saveFile(multipartFile);

        //에셋 저장
        Asset asset = new Asset(assetRegistDto, resource, member);
        asset = assetRepository.save(asset);

        List<Tag> savedTags = savedTags(assetRegistDto.getTags());

        //에셋, 태그 매핑
        List<AssetTag> assetTags = new ArrayList<>();
        for (Tag savedTag : savedTags) {
            savedTag.setUseCount(savedTag.getUseCount() + 1);
            assetTags.add(new AssetTag(asset, savedTag));
        }
        assetTags = assetTagRepository.saveAll(assetTags);

        MemberAsset memberAsset = new MemberAsset(member, asset, DealType.SELL);
        memberAssetRepository.save(memberAsset);

        return asset;
    }

    @Override
    @Transactional
    public Asset updateAsset(Long id, Member member, AssetRegistDto assetRegistDto) {
        Asset asset = assetRepository.findById(id).orElseThrow(() -> new NotFoundException("해당 에셋이 없습니다"));
        if (!asset.getMember().getId().equals(member.getId())) {
            throw new NotYourAuthorizationException("당신의 에셋이 아닙니다");
        }

        //이전 태그목록 삭제
        List<AssetTag> assetTags = assetTagRepository.findJoinTagByAsset(asset);
        //사용횟수 수정
        List<Tag> tags = assetTags.stream()
                .map(assetTag -> assetTag.getTag())
                .collect(Collectors.toList());
        for (Tag tag : tags) {
            tag.setUseCount(tag.getUseCount() - 1);
        }
        assetTagRepository.deleteAll(assetTags);

        //새로운 태그 저장
        List<AssetTag> newAssetTags = new ArrayList<>();
        List<Tag> savedTags = savedTags(assetRegistDto.getTags());
        for (Tag savedTag : savedTags) {
            savedTag.setUseCount(savedTag.getUseCount() + 1);
            newAssetTags.add(new AssetTag(asset, savedTag));
        }
        assetTagRepository.saveAll(newAssetTags);


        asset.setTitle(assetRegistDto.getTitle());
        asset.setType(assetRegistDto.getType());
        asset.setDescription(assetRegistDto.getDescription());
        asset.setPoint(assetRegistDto.getPoint());
        return asset;
    }

    @Override
    public Slice<AssetSearchDto> searchAssetByTag(List<String> tags, Pageable pageable, Member member) {

        Slice<Asset> assetSlice = assetTagRepository.findByTagIn(
                tagRepository.findByTagNameIn(tags), pageable);

        List<Asset> assets = assetSlice.getContent();
        //todo 에셋의 작성자를 찾는쿼리 (assetTagRespository에서 객체안 객체로 패치조인 어려움
        assets = assetRepository.findJoinMemberByAssets(assets);


        List<AssetSearchDto> assetSearchDtos = assets.stream()
                .map(AssetSearchDto::new)
                .collect(Collectors.toList());

        //각 에셋에 태그목록 추가
        assetSearchDtos = findTags(assets, assetSearchDtos);

        //로그인된 사용자면 구매했는지 표시
        if (member != null) {
            assetSearchDtos = isAvailable(assets, assetSearchDtos, member);
        }

        return new SliceImpl<>(
                assetSearchDtos,
                pageable,
                assetSlice.hasNext()
        );
    }

    @Override
    public Page<AssetSearchDto> searchAssetByUploader(Long uploaderId, Member member, Pageable pageable) {
        Member uploader = memberRepository.findById(uploaderId).orElseThrow(() -> new NotFoundException("uploader not found"));

        Page<Asset> assetPage = assetRepository.findByMember(uploader, pageable);
        List<AssetSearchDto> assetSearchDtos = assetPage.getContent().stream()
                .map(asset -> new AssetSearchDto(asset))
                .collect(Collectors.toList());

        assetSearchDtos = findTags(assetPage.getContent(), assetSearchDtos);
        assetSearchDtos = isAvailable(assetPage.getContent(), assetSearchDtos, member);

        return new PageImpl<>(
                assetSearchDtos,
                pageable,
                assetPage.getTotalPages()
        );
    }

    @Override
    public Page<Tag> findPageTags(Pageable pageable) {

        return tagRepository.findByOrderByUseCountDesc(pageable);
    }

    @Override
    public Page<AssetSearchDto> searchMyAssets(Member member, Pageable pageable) {
        Page<MemberAsset> assetPage = memberAssetRepository.findPageByMember(member, pageable);
        List<Asset> assets = assetPage.getContent().stream()
                .map(MemberAsset::getAsset)
                .collect(Collectors.toList());
        assets = assetRepository.findJoinMemberByAssets(assets);

        return new PageImpl<>(
                assets.stream()
                        .map(AssetSearchDto::new)
                        .collect(Collectors.toList()),
                pageable,
                assetPage.getTotalPages()
        );
    }

    //각 에셋에 태그목록을 추가
    private List<AssetSearchDto> findTags(List<Asset> assets, List<AssetSearchDto> assetSearchDtos) {
        List<AssetTag> assetTags = assetTagRepository.findByAssetIn(assets);
        for (AssetTag assetTag : assetTags) {
            for (AssetSearchDto assetSearchDto : assetSearchDtos) {
                if (assetSearchDto.getId().equals(assetTag.getAsset().getId())) {
                    assetSearchDto.addTags(assetTag.getTag());
                }
            }
        }


        return assetSearchDtos;
    }

    @Override
    @Transactional
    public Integer purchaseAsset(Long assetId, Member member) {
        Asset asset = assetRepository.findById(assetId).orElseThrow(() -> new NotFoundException("에셋을 찾을 수 없습니다"));
        Optional<MemberAsset> memberAssetOptional = memberAssetRepository.findByAssetAndMember(asset, member);
        if (!memberAssetOptional.isEmpty()) {
            return 204;
        }

        if (asset.getPoint() > member.getPoint()) {
            return 200;
        }

        Member seller = asset.getMember();
        member.setPoint(member.getPoint() - asset.getPoint());
        seller.setPoint(seller.getPoint() + asset.getPoint());

        TransactionHistory buyTransactionHistory = new TransactionHistory(member, asset, PointChangeType.BUY_ASSET, asset.getPoint());
        TransactionHistory sellTransactionHistory = new TransactionHistory(asset.getMember(), asset, PointChangeType.SELL_ASSET, asset.getPoint());
        historyRepository.saveAll(List.of(buyTransactionHistory, sellTransactionHistory));

        MemberAsset memberAsset = new MemberAsset(member, asset, DealType.BUY);
        memberAssetRepository.save(memberAsset);

        return 201;
    }

    @Override
    public Page<AssetSearchDto> searchAsset(AssetFilterDto assetFilterDto, Member member, Pageable pageable) {
        Page<AssetSearchDto> assetSearchDtoPage = assetRepository.searchAsset(assetFilterDto, member, pageable);
        List<AssetSearchDto> assetSearchDtos = assetSearchDtoPage.getContent();

        log.info("assetSearchDtos: " + assetSearchDtos.toString());

        //각 에셋의 태그 조회
        List<AssetTag> assetTags = assetTagRepository.findByAssetIdIn(
                assetSearchDtos.stream()
                        .map(AssetSearchDto::getId)
                        .collect(Collectors.toList())
        );

        for (AssetTag assetTag : assetTags) {
            for (AssetSearchDto assetSearchDto : assetSearchDtos) {
                if (assetSearchDto.getId().equals(assetTag.getAsset().getId())) {
                    assetSearchDto.addTags(assetTag.getTag());
                }
            }
        }
        log.info("assetSearchDtos: " + assetSearchDtos.toString());

        return new PageImpl<>(
                assetSearchDtos,
                pageable,
                assetSearchDtoPage.getTotalPages()
        );

    }

    //사용자가 해당 에셋을 보유하였는지 확인하고, dto에 표시
    private List<AssetSearchDto> isAvailable(List<Asset> assets, List<AssetSearchDto> assetSearchDtos, Member member) {
        List<MemberAsset> memberAssets =
                memberAssetRepository.findByMemberAndAssetIn(member, assets);
        for (AssetSearchDto assetSearchDto : assetSearchDtos) {
            for (MemberAsset memberAsset : memberAssets) {
                if (assetSearchDto.getId().equals(memberAsset.getAsset().getId())) {
                    assetSearchDto.setIsAvailable(true);
                }
            }
        }
        return assetSearchDtos;
    }

    //저장되지 않은 태그는 저장
    private List<Tag> savedTags(List<String> tags) {
        List<Tag> newTags = new ArrayList<>();
        List<Tag> savedTags = tagRepository.findByTagNameIn(tags);
        List<Tag> result = new ArrayList<>(savedTags);
        for (String tag : tags) {
            boolean check = false;
            for (Tag savedTag : savedTags) {
                if (savedTag.getTagName().equals(tag)) {
                    check = true;
                    break;
                }
            }
            if (!check) {
                newTags.add(new Tag(tag));
            }
        }
        newTags = tagRepository.saveAll(newTags);
        result.addAll(newTags);
        return result;
    }


}
