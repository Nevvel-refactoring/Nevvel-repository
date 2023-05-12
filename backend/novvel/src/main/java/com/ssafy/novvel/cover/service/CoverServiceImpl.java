package com.ssafy.novvel.cover.service;

import com.ssafy.novvel.cover.dto.CoverSearchConditions;
import com.ssafy.novvel.cover.dto.CoverWithConditions;
import com.ssafy.novvel.cover.dto.CoverInfoAndEpisodesDto;
import com.ssafy.novvel.cover.dto.CoverModifyDto;
import com.ssafy.novvel.cover.dto.CoverPurchasedDto;
import com.ssafy.novvel.cover.repository.CoverRepository;
import com.ssafy.novvel.cover.dto.CoverRegisterDto;
import com.ssafy.novvel.cover.entity.Cover;
import com.ssafy.novvel.genre.repository.GenreRepository;
import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.resource.entity.Resource;
import com.ssafy.novvel.resource.service.ResourceService;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import javax.naming.AuthenticationException;
import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
public class CoverServiceImpl implements CoverService {

    private final ResourceService resourceService;
    private final GenreRepository genreRepository;
    private final CoverRepository coverRepository;

    public CoverServiceImpl(ResourceService resourceService,
        GenreRepository genreRepository, CoverRepository coverRepository) {
        this.resourceService = resourceService;
        this.genreRepository = genreRepository;
        this.coverRepository = coverRepository;
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
    public CoverInfoAndEpisodesDto getAllEpisodes(Long coverId, Long memberId) {

        Cover cover = coverRepository.findById(coverId).orElseThrow(NullPointerException::new);
        CoverInfoAndEpisodesDto coverInfoAndEpisodesDto = new CoverInfoAndEpisodesDto();
        coverInfoAndEpisodesDto.setTitle(cover.getTitle());
        coverInfoAndEpisodesDto.setDescription(cover.getDescription());
        coverInfoAndEpisodesDto.setGenreName(cover.getGenre().getName());

        coverInfoAndEpisodesDto.setEpisodes(coverRepository.findEpisodesInfoDto(coverId, memberId));

        return coverInfoAndEpisodesDto;
    }

    @Transactional
    public List<String> updateCover(MultipartFile multipartFile, Long coverId,
        CoverModifyDto coverModifyDto,
        Long userId) throws AuthenticationException, IOException {

        Cover cover = coverRepository.findById(coverId).orElseThrow(NullPointerException::new);

        if (!Objects.equals(cover.getMember().getId(), userId)) {
            throw new AuthenticationException();
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

    private List<String> findPreviousResourceInS3(Resource current, Resource previous) {

        if (current == null || previous == null) {
            return null;
        }

        List<String> urlAndThumbnail = new ArrayList<>();
        if (!current.getUrl().equals(previous.getUrl())) {
            urlAndThumbnail.add(previous.getUrl());
        }
        if (!current.getThumbnailUrl().equals(previous.getThumbnailUrl())) {
            urlAndThumbnail.add(previous.getThumbnailUrl());
        }

        return urlAndThumbnail.isEmpty() ? null : urlAndThumbnail;
    }

    @Override
    public Page<CoverWithConditions> searchCoverWithCondition(
        CoverSearchConditions coverSearchConditions) {

        final int numberOfCoversPerPage = 20;
        Pageable pageable = PageRequest.of(coverSearchConditions.getPageNum(),
            numberOfCoversPerPage);

        return coverRepository.searchCover(coverSearchConditions, pageable);
    }

    @Override
    public Page<CoverPurchasedDto> getPurchasedCover(Member member, Pageable pageable) {

        return coverRepository.findPurchasedCoverByMember(member.getId(), pageable);
    }
}
