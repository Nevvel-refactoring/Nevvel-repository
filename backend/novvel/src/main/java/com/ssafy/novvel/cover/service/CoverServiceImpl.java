package com.ssafy.novvel.cover.service;

import com.ssafy.novvel.cover.repository.CoverRepository;
import com.ssafy.novvel.cover.dto.CoverRegisterDto;
import com.ssafy.novvel.cover.entity.Cover;
import com.ssafy.novvel.genre.entity.Genre;
import com.ssafy.novvel.genre.repository.GenreRepository;
import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.resource.entity.Resource;
import com.ssafy.novvel.resource.service.ResourceService;
import java.io.IOException;
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
        Genre genre = genreRepository.getReferenceById(coverRegisterDto.getGenreId());

        return coverRepository.save(new Cover(resource, coverRegisterDto, member, genre));

    }
}
