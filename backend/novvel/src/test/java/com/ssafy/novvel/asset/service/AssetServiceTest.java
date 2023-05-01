package com.ssafy.novvel.asset.service;

import com.ssafy.novvel.asset.dto.AssetPurchaseType;
import com.ssafy.novvel.asset.dto.AssetRegistDto;
import com.ssafy.novvel.asset.dto.AssetSearchDto;
import com.ssafy.novvel.asset.entity.Asset;
import com.ssafy.novvel.asset.entity.AssetTag;
import com.ssafy.novvel.asset.entity.AssetType;
import com.ssafy.novvel.asset.entity.Tag;
import com.ssafy.novvel.asset.repository.AssetRepository;
import com.ssafy.novvel.asset.repository.AssetTagRepository;
import com.ssafy.novvel.asset.repository.TagRepository;
import com.ssafy.novvel.exception.NotFoundException;
import com.ssafy.novvel.member.repository.MemberRepository;
import com.ssafy.novvel.memberasset.entity.DealType;
import com.ssafy.novvel.memberasset.entity.MemberAsset;
import com.ssafy.novvel.memberasset.repository.MemberAssetRepository;
import com.ssafy.novvel.resource.entity.Resource;
import com.ssafy.novvel.resource.service.ResourceService;
import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.transactionhistory.entity.TransactionHistory;
import com.ssafy.novvel.transactionhistory.repository.TransactionHistoryRepository;
import com.ssafy.novvel.util.TestUtil;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.*;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@ExtendWith(MockitoExtension.class)
@ActiveProfiles("test")
public class AssetServiceTest {

    @InjectMocks
    private AssetServiceImpl assetService;
    @Mock
    private AssetRepository assetRepository;
    @Mock
    private AssetTagRepository assetTagRepository;
    @Mock
    private TagRepository tagRepository;
    @Mock
    private ResourceService resourceService;
    @Mock
    private MemberAssetRepository memberAssetRepository;
    @Mock
    private MemberRepository memberRepository;
    @Mock
    private TransactionHistoryRepository historyRepository;

    @Test
    void addAssetTest() throws IOException {
        File file = new File("src/test/resources/test.gif");

        //input param
        MultipartFile multipartFile = new MockMultipartFile(file.getName(), file.getName(), Files.probeContentType(file.toPath()), Files.readAllBytes(file.toPath()));
        Resource resource = TestUtil.getResource();

        AssetRegistDto assetRegistDto = AssetRegistDto.builder()
                .type(AssetType.IMAGE)
                .title("title")
                .description("desc")
                .point(10L)
                .tags(List.of("0", "호러"))
                .build();
        Member member = TestUtil.getMember();


        Asset asset = Asset.builder()
                .id(1L)
                .title(assetRegistDto.getTitle())
                .point(assetRegistDto.getPoint())
                .description(assetRegistDto.getDescription())
                .resource(resource)
                .member(member)
                .type(assetRegistDto.getType())
                .build();
        List<Tag> savedTagList = TestUtil.getTagList(2);
        List<Tag> findTags = List.of(savedTagList.get(0));
        List<Tag> newTags = List.of(new Tag(3L, "호러"));
        Set<Tag> resultTagSet = Set.of(savedTagList.get(0), newTags.get(0));
        List<AssetTag> assetTags = new ArrayList<>();
        for (Tag tag : resultTagSet) {
            assetTags.add(new AssetTag(asset, tag));
        }

        //when
        Mockito.doReturn(resource).when(resourceService).saveFile(multipartFile);
        Mockito.doReturn(asset).when(assetRepository).save(Mockito.any());
        Mockito.doReturn(findTags).when(tagRepository).findByTagNameIn(assetRegistDto.getTags());
        Mockito.doReturn(newTags).when(tagRepository).saveAll(Mockito.any());
        Mockito.doReturn(assetTags).when(assetTagRepository).saveAll(Mockito.any());

        Asset result = assetService.addAsset(multipartFile, member, assetRegistDto);

        //then
        Mockito.verify(tagRepository, Mockito.times(1)).saveAll(Mockito.any());
        Mockito.verify(tagRepository, Mockito.times(1)).findByTagNameIn(Mockito.any());
        Mockito.verify(assetTagRepository, Mockito.times(1)).saveAll(Mockito.any());
        Assertions.assertThat(result.getDescription()).isEqualTo(assetRegistDto.getDescription());
        Assertions.assertThat(result.getTitle()).isEqualTo(assetRegistDto.getTitle());
        Assertions.assertThat(result.getPoint()).isEqualTo(assetRegistDto.getPoint());
        Assertions.assertThat(result.getType()).isEqualTo(assetRegistDto.getType());
    }

    @Test
    void searchAssetByTagTest() {

        List<Member> members = TestUtil.getUSERMembers(4);
        List<Asset> assets = TestUtil.getAssetList(4, members, TestUtil.getResources(4));

        Tag tag1 = new Tag(1L, "tag1");
        Tag tag2 = new Tag(2L, "tag2");
        Tag tag3 = new Tag(3L, "tag3");

        List<AssetTag> findByAssetInResult = List.of(
                new AssetTag(assets.get(0), tag1),
                new AssetTag(assets.get(0), tag2),
                new AssetTag(assets.get(1), tag2),
                new AssetTag(assets.get(2), tag2),
                new AssetTag(assets.get(3), tag3)
        );

        List<Tag> findByTagNameInResult = List.of(tag1, tag2);
        Pageable pageable = PageRequest.of(0, 5);
        Slice<Asset> findByTagInResult = new SliceImpl<>(
                List.of(assets.get(0), assets.get(1), assets.get(2)),
                pageable,
                false
        );

        List<String> findTageNames = List.of("tag1", "tag2");

        MemberAsset memberAsset1 = new MemberAsset(1L, members.get(0), assets.get(0), DealType.BUY);
        MemberAsset memberAsset2 = new MemberAsset(2L, members.get(0), assets.get(1), DealType.SELL);
        List<MemberAsset> memberAssets = List.of(memberAsset1, memberAsset2);

        //when
        Mockito.doReturn(findByTagNameInResult).when(tagRepository).findByTagNameIn(findTageNames);
        Mockito.doReturn(findByTagInResult).when(assetTagRepository).findByTagIn(findByTagNameInResult, pageable);
        Mockito.doReturn(findByTagInResult.getContent()).when(assetRepository).findJoinMemberByAssets(findByTagInResult.getContent());
        Mockito.doReturn(findByAssetInResult).when(assetTagRepository).findByAssetIn(findByTagInResult.getContent());
        Mockito.doReturn(memberAssets).when(memberAssetRepository)
                .findByMemberAndAssetIn(members.get(0), List.of(assets.get(0), assets.get(1), assets.get(2)));
        Slice<AssetSearchDto> assetSearchDtos = assetService.searchAssetByTag(findTageNames, pageable, members.get(0));

        //then
        Mockito.verify(tagRepository, Mockito.times(1)).findByTagNameIn(findTageNames);
        Mockito.verify(assetTagRepository, Mockito.times(1)).findByTagIn(findByTagNameInResult, pageable);
        Mockito.verify(assetRepository, Mockito.times(1)).findJoinMemberByAssets(findByTagInResult.getContent());
        Mockito.verify(assetTagRepository, Mockito.times(1)).findByAssetIn(findByTagInResult.getContent());
        Mockito.verify(memberAssetRepository, Mockito.times(1))
                .findByMemberAndAssetIn(members.get(0), List.of(assets.get(0), assets.get(1), assets.get(2)));
        Assertions.assertThat(assetSearchDtos.getContent().size()).isEqualTo(3);
        Assertions.assertThat(assetSearchDtos.getContent().get(0).getIsAvailable()).isEqualTo(true);
        Assertions.assertThat(assetSearchDtos.getContent().get(1).getIsAvailable()).isEqualTo(true);
        Assertions.assertThat(assetSearchDtos.getContent().get(2).getIsAvailable()).isEqualTo(false);


    }

    @Test
    void searchAssetByUploaderTest() {
        List<Member> members = TestUtil.getUSERMembers(2);
        List<Asset> assets = TestUtil.getAssetList(4, members.get(0), TestUtil.getResources(4));
        Tag tag1 = new Tag(1L, "tag1");
        Tag tag2 = new Tag(2L, "tag2");
        Tag tag3 = new Tag(3L, "tag3");

        List<AssetTag> findByAssetInResult = List.of(
                new AssetTag(assets.get(0), tag1),
                new AssetTag(assets.get(0), tag2),
                new AssetTag(assets.get(1), tag2),
                new AssetTag(assets.get(2), tag2),
                new AssetTag(assets.get(3), tag3)
        );
        List<MemberAsset> findByMemberAndAssetInResult = TestUtil.getMemberAssets(members.get(1), assets);

        Pageable pageable = PageRequest.of(0, 5);
        Page<Asset> findByMemberResult = new PageImpl<>(
                assets,
                pageable,
                pageable.getPageSize()
        );

        //when
        Mockito.doReturn(Optional.of(members.get(0))).when(memberRepository).findById(Mockito.any(Long.class));
        Mockito.doReturn(findByMemberResult).when(assetRepository).findByMember(members.get(0), pageable);
        Mockito.doReturn(findByAssetInResult).when(assetTagRepository).findByAssetIn(findByMemberResult.getContent());
        Mockito.doReturn(findByMemberAndAssetInResult).when(memberAssetRepository).findByMemberAndAssetIn(members.get(1), findByMemberResult.getContent());
        Page<AssetSearchDto> assetSearchDtos = assetService.searchAssetByUploader(0L,members.get(1),pageable);

        //then
        Mockito.verify(memberRepository, Mockito.times(1)).findById(Mockito.any(Long.class));
        Mockito.verify(assetRepository, Mockito.times(1)).findByMember(members.get(0), pageable);
        Mockito.verify(assetTagRepository, Mockito.times(1)).findByAssetIn(findByMemberResult.getContent());
        Mockito.verify(memberAssetRepository, Mockito.times(1)).findByMemberAndAssetIn(members.get(1), findByMemberResult.getContent());
        Assertions.assertThat(assetSearchDtos.getContent().size()).isEqualTo(4);
        Assertions.assertThat(assetSearchDtos.getContent().get(0).getIsAvailable()).isEqualTo(true);
        Assertions.assertThat(assetSearchDtos.getContent().get(0).getTitle()).isEqualTo("0title");
        Assertions.assertThat(assetSearchDtos.getContent().get(0).getUploader().getId()).isEqualTo(0L);
        Assertions.assertThat(assetSearchDtos.getContent().get(0).getUploader().getNickname()).isEqualTo("0nickname");
        Assertions.assertThat(assetSearchDtos.getContent().get(0).getUploader().getId()).isEqualTo(0L);
        Assertions.assertThat(assetSearchDtos.getContent().get(1).getIsAvailable()).isEqualTo(false);
        Assertions.assertThat(assetSearchDtos.getContent().get(2).getIsAvailable()).isEqualTo(true);
        Assertions.assertThat(assetSearchDtos.getContent().get(3).getIsAvailable()).isEqualTo(false);


    }

    @Test
    void purchaseAssetNotFoundExcTest() {
        Member member = TestUtil.getUSERMember().get();
        List<Asset> assets = TestUtil.getAssetList(1);

        Mockito.lenient().doReturn(Optional.ofNullable(null)).when(assetRepository).findById(assets.get(0).getId());

        Assertions.assertThatThrownBy(() -> {
            throw new NotFoundException("에셋을 찾을 수 없습니다");
        }).isInstanceOf(NotFoundException.class).hasMessageContaining("에셋을 찾을 수 없습니다");

    }
    @Test
    void purchaseAssetDuplicateTest() {
        Member member = TestUtil.getUSERMember().get();
        List<Asset> assets = TestUtil.getAssetList(1);
        Optional<MemberAsset> memberAssetOptional = Optional.of(new MemberAsset(1L, member, assets.get(0), DealType.BUY));

        Mockito.doReturn(Optional.of(assets.get(0))).when(assetRepository).findById(assets.get(0).getId());
        Mockito.doReturn(memberAssetOptional).when(memberAssetRepository).findByAssetAndMember(assets.get(0), member);

        AssetPurchaseType assetPurchaseType = assetService.purchaseAsset(assets.get(0).getId(), member);

        Assertions.assertThat(assetPurchaseType).isEqualTo(AssetPurchaseType.DUPLICATED);

    }

    @Test
    void purchaseAssetNEED_POINTTest() {
        Member member = TestUtil.getUSERMember().get();
        List<Asset> assets = TestUtil.getAssetList(1);
        Optional<MemberAsset> memberAssetOptional = Optional.ofNullable(null);

        Mockito.doReturn(Optional.of(assets.get(0))).when(assetRepository).findById(assets.get(0).getId());
        Mockito.doReturn(memberAssetOptional).when(memberAssetRepository).findByAssetAndMember(assets.get(0), member);

        AssetPurchaseType assetPurchaseType = assetService.purchaseAsset(assets.get(0).getId(), member);

        Assertions.assertThat(assetPurchaseType).isEqualTo(AssetPurchaseType.NEED_POINT);
    }
    @Test
    void purchaseAssetPurchaseTest() {
        Member member = TestUtil.getUSERMember().get();
        member.setPoint(1000l);
        List<Asset> assets = TestUtil.getAssetList(1);
        Optional<MemberAsset> memberAssetOptional = Optional.ofNullable(null);

        Mockito.doReturn(Optional.of(assets.get(0))).when(assetRepository).findById(assets.get(0).getId());
        Mockito.doReturn(memberAssetOptional).when(memberAssetRepository).findByAssetAndMember(assets.get(0), member);
        Mockito.doReturn(new ArrayList<TransactionHistory>()).when(historyRepository).saveAll(Mockito.anyIterable());

        AssetPurchaseType assetPurchaseType = assetService.purchaseAsset(assets.get(0).getId(), member);

        Assertions.assertThat(assetPurchaseType).isEqualTo(AssetPurchaseType.PUCHASE);
    }



}
