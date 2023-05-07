package com.ssafy.novvel.cover.service;

import com.ssafy.novvel.cover.dto.CoverModifyDto;
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
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
    @Transactional
    public List<String> updateCover(MultipartFile multipartFile, Long coverId,
        CoverModifyDto coverModifyDto,
        Long userId) throws AuthenticationException, IOException {

        Cover cover = coverRepository.findById(coverId).orElseThrow(NullPointerException::new);

        if (!Objects.equals(cover.getMember().getId(), userId)) {
            throw new AuthenticationException();
        } else {

            Resource resource = resourceService.saveFile(multipartFile);

            Cover newCover = coverRepository.save(
                new Cover(resource, coverId, cover.getPublishDate(), cover.getLikes(),
                    coverModifyDto, cover.getMember(),
                    genreRepository.getReferenceById(coverModifyDto.getGenreId())));

            return findPreviousResourceInS3(newCover.getResource(), cover.getResource());
        }

    }
    
    private List<String> findPreviousResourceInS3(Resource current, Resource previous) {

        if(current == null || previous == null) return null;

        List<String> urlAndThumbnail = new ArrayList<>();
        if (!current.getUrl().equals(previous.getUrl())) {
            urlAndThumbnail.add(previous.getUrl());
        }
        if (!current.getThumbnailUrl().equals(previous.getThumbnailUrl())) {
            urlAndThumbnail.add(previous.getThumbnailUrl());
        }

        return urlAndThumbnail.isEmpty() ? null : urlAndThumbnail;
    }

}
