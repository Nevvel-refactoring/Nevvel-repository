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
import com.ssafy.novvel.episode.entity.ReadEpisode;
import com.ssafy.novvel.episode.repository.ReadEpisodeRepository;
import com.ssafy.novvel.exception.NotFoundException;
import com.ssafy.novvel.exception.NotYourAuthorizationException;
import com.ssafy.novvel.genre.repository.GenreRepository;
import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.member.repository.MemberRepository;
import com.ssafy.novvel.resource.entity.Resource;
import com.ssafy.novvel.resource.service.ResourceService;
import java.io.IOException;
import java.util.Objects;
import java.util.Optional;
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
    private final ReadEpisodeRepository readEpisodeRepository;
    private final LikedCoverRepository likedCoverRepository;

    public CoverServiceImpl(
            ResourceService resourceService,
            GenreRepository genreRepository,
            CoverRepository coverRepository,
            ReadEpisodeRepository readEpisodeRepository,
            LikedCoverRepository likedCoverRepository,
            MemberRepository memberRepository) {
        this.resourceService = resourceService;
        this.genreRepository = genreRepository;
        this.coverRepository = coverRepository;
        this.readEpisodeRepository = readEpisodeRepository;
        this.likedCoverRepository = likedCoverRepository;
        this.memberRepository = memberRepository;
    }

    @Override
    @Transactional
    public Cover registerCover(MultipartFile multipartFile, CoverRegisterDto coverRegisterDto,
                               Member member) throws IOException, EntityNotFoundException {

        Resource resource = resourceService.saveFile(multipartFile);

        return coverRepository.save(new Cover(resource, coverRegisterDto, member,
                genreRepository.getReferenceById(coverRegisterDto.getGenreId())));

    }

    @Override
    public CoverInfoAndEpisodesDto getAllEpisodes(Long coverId, Member member) {

        Cover cover = coverRepository.findById(coverId).orElseThrow(NullPointerException::new);
        CoverInfoAndEpisodesDto coverInfoAndEpisodesDto = new CoverInfoAndEpisodesDto();
        coverInfoAndEpisodesDto.setTitle(cover.getTitle());
        coverInfoAndEpisodesDto.setDescription(cover.getDescription());
        coverInfoAndEpisodesDto.setGenre(cover.getGenre().getName());
        coverInfoAndEpisodesDto.setThumbnail(cover.getResource().getThumbnailUrl());
        coverInfoAndEpisodesDto.setWriter(
                new CoverWriter(cover.getMember().getId(), cover.getMember().getNickname()));

        ReadEpisode readEpisode = null;
        if(member != null) {
            readEpisode = readEpisodeRepository.findFirstByMember_IdAndEpisode_Cover_IdOrderByLastModifyedDateTimeDesc(
                member.getId(), coverId);
        }
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

        Cover cover = coverRepository.findById(coverId).orElseThrow(NullPointerException::new);

        if (!Objects.equals(cover.getMember().getId(), userId)) {
            throw new NotYourAuthorizationException();
        } else {
            // TODO
            // 1) multipart가 null이면 장르별 default image
            Resource resource = resourceService.saveFile(multipartFile);

            Cover newCover = coverRepository.save(
                    new Cover(resource, coverId, cover.getLastPublishDate(),
                            cover.getFirstPublishDate(), cover.getLikes(), cover.getViewCount(),
                            coverModifyDto, cover.getMember(),
                            genreRepository.getReferenceById(coverModifyDto.getGenreId())));

            return findPreviousResourceInS3(newCover.getResource(), cover.getResource());
        }

    }

    private Resource findPreviousResourceInS3(Resource current, Resource previous) {

        if (current == null || previous == null) {
            return null;
        }

        if (!current.getUrl().equals(previous.getUrl())) {
            return previous;
        }

        return null;
    }

    @Override
    public Page<CoverWithConditions> searchCoverWithCondition(
            CoverSearchConditions coverSearchConditions, Pageable pageable) {

        return coverRepository.searchCover(coverSearchConditions, pageable);
    }

    @Override
    public Page<CoverPurchasedDto> getPurchasedCover(Member member, Pageable pageable) {

        return coverRepository.findPurchasedCoverByMember(member.getId(), pageable);
    }

    @Override
    public Page<CoverWithConditions> getCoverOfUploader(Member member, Long id, Pageable pageable) {
        return coverRepository.findCoverById(member, id, pageable);
    }

    @Override
    @Transactional
    public int likeCover(Member member, Long coverId) {
        member = memberRepository.save(member);
        Optional<LikedCover> likedCoverOptional = likedCoverRepository.findByMemberAndCoverId(member, coverId);

        if (likedCoverOptional.isEmpty()) {
            Cover cover = coverRepository.findById(coverId).orElseThrow(() -> new NotFoundException("해당 소설을 찾을 수 없습니다"));
            LikedCover likedCover = new LikedCover(cover, member);
            likedCoverRepository.save(likedCover);
            return 201;
        } else {
            likedCoverRepository.delete(likedCoverOptional.get());
            return 200;
        }

    }

    @Override
    public Page<CoverWithConditions> getFavoriteCover(Member member, Pageable pageable) {
        return likedCoverRepository.getLikedCovers(member, pageable);
    }
}
