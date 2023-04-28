package com.ssafy.novvel.asset.service;

import com.ssafy.novvel.asset.dto.AssetRegistDto;
import com.ssafy.novvel.asset.dto.AssetSearchDto;
import com.ssafy.novvel.asset.entity.Asset;
import com.ssafy.novvel.asset.entity.AssetTag;
import com.ssafy.novvel.asset.entity.Tag;
import com.ssafy.novvel.asset.repository.AssetRepository;
import com.ssafy.novvel.asset.repository.AssetTagRepository;
import com.ssafy.novvel.asset.repository.TagRepository;
import com.ssafy.novvel.memberasset.entity.MemberAsset;
import com.ssafy.novvel.memberasset.repository.MemberAssetRepository;
import com.ssafy.novvel.resource.entity.Resource;
import com.ssafy.novvel.resource.service.ResourceService;
import com.ssafy.novvel.member.entity.Member;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.domain.SliceImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
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

        return asset;
    }

    @Override
    public Slice<AssetSearchDto> searchAssetByTag(List<String> tags, Pageable pageable, Member member) {

        Slice<Asset> assetSlice = assetTagRepository.findByTagIn(
                tagRepository.findByTagNameIn(tags), pageable);

        List<Asset> assets = assetSlice.getContent();
        List<AssetSearchDto> assetSearchDtos = assets.stream()
                .map(AssetSearchDto::new)
                .collect(Collectors.toList());

        //각 에셋에 태그목록을 추가
        List<AssetTag> assetTags = assetTagRepository.findByAssetIn(assets);
        for (AssetTag assetTag : assetTags) {
            for (AssetSearchDto assetSearchDto : assetSearchDtos) {
                if (assetSearchDto.getId().equals(assetTag.getAsset().getId())) {
                    assetSearchDto.addTags(assetTag.getTag());
                }
            }
        }

        //로그인된 사용자면 구매했는지 표시
        if (member != null) {
            List<MemberAsset> memberAssets =
                    memberAssetRepository.findByMemberAndAssetIn(member, assetSlice.getContent());
            for (AssetSearchDto assetSearchDto : assetSearchDtos) {
                for (MemberAsset memberAsset : memberAssets) {
                    if (assetSearchDto.getId().equals(memberAsset.getAsset().getId())) {
                        assetSearchDto.setIsAvailable(true);
                    }
                }
            }
        }


        return new SliceImpl<>(
                assetSearchDtos,
                pageable,
                assetSlice.hasNext()
        );
    }

    @Override
    public Page<Tag> findPageTags(Pageable pageable) {

        return tagRepository.findByOrderByUseCountDesc(pageable);
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
            if (!check){
                newTags.add(new Tag(tag));
            }
        }
        newTags = tagRepository.saveAll(newTags);
        result.addAll(newTags);
        return result;
    }


}
