package com.ssafy.novvel.cover.service;

import com.ssafy.novvel.cover.dto.CoverSearchConditions;
import com.ssafy.novvel.cover.dto.CoverWithConditions;
import com.ssafy.novvel.cover.dto.CoverInfoAndEpisodesDto;
import com.ssafy.novvel.cover.dto.CoverModifyDto;
import com.ssafy.novvel.cover.dto.CoverPurchasedDto;
import com.ssafy.novvel.cover.dto.CoverWriter;
import com.ssafy.novvel.cover.entity.LikedCover;
import com.ssafy.novvel.cover.repository.LikedCoverRepository;
import com.ssafy.novvel.cover.repository.CoverRepository;
import com.ssafy.novvel.cover.dto.CoverRegisterDto;
import com.ssafy.novvel.cover.entity.Cover;
import com.ssafy.novvel.cover.util.DefaultImage;
import com.ssafy.novvel.episode.entity.ReadEpisode;
import com.ssafy.novvel.episode.repository.ReadEpisodeRepository;
import com.ssafy.novvel.exception.NotFoundException;
import com.ssafy.novvel.exception.NotYourAuthorizationException;
import com.ssafy.novvel.genre.dto.GenreDto;
import com.ssafy.novvel.genre.repository.GenreRepository;
import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.member.repository.MemberRepository;
import com.ssafy.novvel.resource.entity.Resource;
import com.ssafy.novvel.resource.repository.ResourceRepository;
import com.ssafy.novvel.resource.service.ResourceService;
import java.io.IOException;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;
import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
public class CoverServiceImpl implements CoverService {

    private final MemberRepository memberRepository;

    private final ResourceService resourceService;
    private final GenreRepository genreRepository;
    private final CoverRepository coverRepository;
    private final ResourceRepository resourceRepository;
    private final ReadEpisodeRepository readEpisodeRepository;
    private final DefaultImage defaultImage;
    private final LikedCoverRepository likedCoverRepository;

    public CoverServiceImpl(
        ResourceService resourceService,
        ResourceRepository resourceRepository,
        GenreRepository genreRepository,
        CoverRepository coverRepository,
        ReadEpisodeRepository readEpisodeRepository,
        LikedCoverRepository likedCoverRepository,
        MemberRepository memberRepository,
        DefaultImage defaultImage) {
        this.resourceService = resourceService;
        this.genreRepository = genreRepository;
        this.coverRepository = coverRepository;
        this.resourceRepository = resourceRepository;
        this.readEpisodeRepository = readEpisodeRepository;
        this.defaultImage = defaultImage;
        this.likedCoverRepository = likedCoverRepository;
        this.memberRepository = memberRepository;
    }

    @Override
    @Transactional
    public Cover registerCover(MultipartFile multipartFile, CoverRegisterDto coverRegisterDto,
        Member member) throws IOException, EntityNotFoundException {
        Resource resource = null;
        if (multipartFile != null && !multipartFile.isEmpty()) {
            resource = resourceService.saveFile(multipartFile);
        }

        return coverRepository.save(new Cover(resource, coverRegisterDto, member,
            genreRepository.getReferenceById(coverRegisterDto.getGenreId())));

    }

    @Override
    public CoverInfoAndEpisodesDto getAllEpisodes(Long coverId, Member member) {

        Cover cover = coverRepository.findCoverById(coverId);
        if (cover == null) {
            throw new NullPointerException();
        }
        CoverInfoAndEpisodesDto coverInfoAndEpisodesDto = new CoverInfoAndEpisodesDto();
        coverInfoAndEpisodesDto.setTitle(cover.getTitle());
        coverInfoAndEpisodesDto.setDescription(cover.getDescription());
        coverInfoAndEpisodesDto.setGenre(cover.getGenre().toDto());
        coverInfoAndEpisodesDto.setViews(cover.getViewCount());
        coverInfoAndEpisodesDto.setLikes(cover.getLikes());
        String thumbnail;
        if (cover.getResource() == null || cover.getResource().getThumbnailUrl() == null) {
            thumbnail = defaultImage.getImageByGenreName(cover.getGenre().getName());
        } else {
            thumbnail = cover.getResource().getThumbnailUrl();
        }
        coverInfoAndEpisodesDto.setThumbnail(thumbnail);
        coverInfoAndEpisodesDto.setWriter(
            new CoverWriter(cover.getMember().getId(), cover.getMember().getNickname()));

        ReadEpisode readEpisode = null;
        Boolean isLiked = Boolean.FALSE;
        if (member != null) {
            readEpisode = readEpisodeRepository.findFirstByMember_IdAndEpisode_Cover_IdOrderByLastModifyedDateTimeDesc(
                member.getId(), coverId);
            isLiked = likedCoverRepository.findByMember_IdAndCover_Id(member.getId(), coverId).isPresent();
        }
        coverInfoAndEpisodesDto.setIsLiked(isLiked);

        Long lastReadEpisodeId = null;
        if (readEpisode != null) {
            lastReadEpisodeId = readEpisode.getEpisode().getId();
        }
        coverInfoAndEpisodesDto.setLastReadEpisodeId(lastReadEpisodeId);

        coverInfoAndEpisodesDto.setEpisodes(coverRepository.findEpisodesInfoDto(cover, member));
        return coverInfoAndEpisodesDto;
    }

    @Override
    @Transactional
    public Resource updateCover(MultipartFile multipartFile, Long coverId,
        CoverModifyDto coverModifyDto,
        Long userId) throws NotYourAuthorizationException, IOException {

        Cover cover = coverRepository.findCoverById(coverId);
        if (cover == null) {
            throw new NullPointerException();
        }

        if (!Objects.equals(cover.getMember().getId(), userId)) {
            throw new NotYourAuthorizationException();
        } else {

            Resource resource = cover.getResource();
            if (!(multipartFile == null || multipartFile.isEmpty())) {
                resource = resourceService.saveFile(multipartFile);
            } else if (coverModifyDto.getIsDefaultImage()) {
                resource = null;
            }

            Resource removedResource = null;
            if (cover.getResource() != null) {

                if (resource == null || !cover.getResource().getId().equals(resource.getId())) {
                    removedResource = cover.getResource();
                    resourceRepository.delete(cover.getResource());
                }
            }

            coverRepository.save(
                new Cover(resource, coverId, cover.getLastPublishDate(),
                    cover.getFirstPublishDate(), cover.getLikes(), cover.getViewCount(),
                    coverModifyDto, cover.getMember(),
                    genreRepository.getReferenceById(coverModifyDto.getGenre())));

            return removedResource;
        }

    }

    @Override
    public Page<CoverWithConditions> searchCoverWithCondition(
        CoverSearchConditions coverSearchConditions, Pageable pageable) {

        return coverRepository.searchCover(coverSearchConditions, pageable, defaultImage);
    }

    @Override
    public Page<CoverPurchasedDto> getPurchasedCover(Member member, Pageable pageable) {
        Page<CoverPurchasedDto> page = coverRepository.findPurchasedCoverByMember(member.getId(),
            pageable);
        if (!page.isEmpty()) {
            page.getContent().stream().map(coverPurchasedDto -> {
                coverPurchasedDto.setThumbnail(
                    coverPurchasedDto.getThumbnail() == null ?
                        defaultImage.getImageByGenreName(coverPurchasedDto.getGenre())
                        : coverPurchasedDto.getThumbnail());
                return coverPurchasedDto;
            }).collect(Collectors.toList());
        }
        return page;
    }

    @Override
    public Page<CoverWithConditions> getCoverOfUploader(Member member, Long id, Pageable pageable) {
        return coverRepository.findCoverById(member, id, pageable, defaultImage);
    }

    @Override
    @Transactional
    public int likeCover(Member member, Long coverId) {
        member = memberRepository.save(member);
        Optional<LikedCover> likedCoverOptional = likedCoverRepository.findByMemberAndCoverId(
            member, coverId);

        Cover cover = coverRepository.findById(coverId)
            .orElseThrow(() -> new NotFoundException("해당 소설을 찾을 수 없습니다"));

        if (likedCoverOptional.isEmpty()) {
            LikedCover likedCover = new LikedCover(cover, member);
            likedCoverRepository.save(likedCover);
            cover.plusLikes();
            coverRepository.save(cover);
            return 201;
        } else {
            likedCoverRepository.delete(likedCoverOptional.get());
            cover.minusLikes();
            coverRepository.save(cover);
            return 200;
        }

    }

    @Override
    public Page<CoverWithConditions> getFavoriteCover(Member member, Pageable pageable) {
        return likedCoverRepository.getLikedCovers(member, pageable, defaultImage);
    }
}
