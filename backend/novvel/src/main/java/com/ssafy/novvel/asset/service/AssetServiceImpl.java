package com.ssafy.novvel.asset.service;

import com.ssafy.novvel.asset.dto.AssetRegistDto;
import com.ssafy.novvel.asset.dto.AssetSearchDto;
import com.ssafy.novvel.asset.entity.Asset;
import com.ssafy.novvel.asset.entity.AssetTag;
import com.ssafy.novvel.asset.entity.Tag;
import com.ssafy.novvel.asset.repository.AssetRepository;
import com.ssafy.novvel.asset.repository.AssetTagRepository;
import com.ssafy.novvel.asset.repository.TagRepository;
import com.ssafy.novvel.resource.entity.Resource;
import com.ssafy.novvel.resource.service.ResourceService;
import com.ssafy.novvel.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class AssetServiceImpl implements AssetService {

    private final AssetRepository assetRepository;
    private final AssetTagRepository assetTagRepository;
    private final TagRepository tagRepository;
    private final ResourceService resourceService;

    @Override
    @Transactional
    public Asset addAsset(MultipartFile multipartFile, Member member, AssetRegistDto assetRegistDto) throws IOException {
        //멀티파트 파일을 저장, Resource에 기록
        Resource resource = resourceService.saveFile(multipartFile);

        //에셋 저장
        Asset asset = new Asset(assetRegistDto, resource, member);
        asset = assetRepository.save(asset);

        Set<Tag> savedTags = savedTags(assetRegistDto.getTags());

        //에셋, 태그 매핑
        List<AssetTag> assetTags = new ArrayList<>();
        for (Tag savedTag : savedTags) {
            assetTags.add(new AssetTag(asset, savedTag));
        }
        assetTags = assetTagRepository.saveAll(assetTags);

        return asset;
    }

    @Override
    public Page<AssetSearchDto> searchAssetByTag(List<Tag> tags) {
        return null;
    }

    //저장되지 않은 태그는 저장
    private Set<Tag> savedTags(List<String> tags) {
        List<Tag> newTags = new ArrayList<>();
        Set<Tag> savedTags = tagRepository.findSetByTagNameIn(tags);
        Set<Tag> result = new HashSet<>(savedTags);
        for (String tag : tags) {
            if (!savedTags.contains(tag)) {
                newTags.add(new Tag(tag));
            }
        }
        newTags = tagRepository.saveAll(newTags);

        for (Tag newTag : newTags) {
            result.add(newTag);
        }
        return savedTags;
    }


}
