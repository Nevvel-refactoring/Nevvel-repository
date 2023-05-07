package com.ssafy.novvel.cover.service;

import com.ssafy.novvel.cover.dto.CoverModifyDto;
import com.ssafy.novvel.cover.dto.CoverRegisterDto;
import com.ssafy.novvel.cover.entity.Cover;
import com.ssafy.novvel.cover.entity.CoverStatusType;
import com.ssafy.novvel.cover.repository.CoverRepository;
import com.ssafy.novvel.genre.entity.Genre;
import com.ssafy.novvel.genre.repository.GenreRepository;
import com.ssafy.novvel.resource.entity.Resource;
import com.ssafy.novvel.resource.service.ResourceService;
import com.ssafy.novvel.util.TestUtil;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import javax.naming.AuthenticationException;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.web.multipart.MultipartFile;

@ExtendWith(MockitoExtension.class)
class CoverServiceTest {

    @InjectMocks
    CoverServiceImpl coverService;

    @Mock
    CoverRepository coverRepository;

    @Mock
    GenreRepository genreRepository;

    @Mock
    ResourceService resourceService;

    @Test
    void registerCover() throws IOException {

        // given
        File file = new File("src/test/resources/cat.jpeg");

        MultipartFile multipartFile = new MockMultipartFile(file.getName(), file.getName(),
            Files.probeContentType(file.toPath()), Files.readAllBytes(file.toPath()));
        Resource resource = TestUtil.getMemberProfile();

        CoverRegisterDto coverRegisterDto = CoverRegisterDto.builder().genreId(1L).title("test")
            .build();
        Genre genre = Genre.builder().id(1L).build();

        Cover expect = Cover.builder()
            .id(1L).coverStatusType(CoverStatusType.SERIALIZED).genre(genre)
            .member(TestUtil.getUSERMember().get()).resource(resource)
            .title(coverRegisterDto.getTitle()).build();

        // when
        Mockito.doReturn(resource).when(resourceService).saveFile(multipartFile);
        Mockito.doReturn(genre).when(genreRepository)
            .getReferenceById(Mockito.any());
        Mockito.doReturn(expect).when(coverRepository).save(Mockito.any());
        Cover result = coverService.registerCover(multipartFile, coverRegisterDto,
            TestUtil.getUSERMember().get());

        // then
        Assertions.assertThat(result.getCoverStatusType()).isEqualTo(expect.getCoverStatusType());
        Assertions.assertThat(result.getTitle()).isEqualTo(expect.getTitle());
        Assertions.assertThat(result.getGenre()).isEqualTo(expect.getGenre());
        Assertions.assertThat(result.getResource()).isEqualTo(expect.getResource());

    }

    @Test
    void updateCoverNullPointException() throws IOException {

        // given
        File file = new File("src/test/resources/cat.jpeg");

        MultipartFile multipartFile = new MockMultipartFile(file.getName(), file.getName(),
            Files.probeContentType(file.toPath()), Files.readAllBytes(file.toPath()));

        CoverModifyDto coverModifyDto = CoverModifyDto.builder()
            .coverStatusType(CoverStatusType.FINISHED)
            .description("test")
            .title("title")
            .build();

        Long memberId = 1L;

        // when
        Mockito.doThrow(new NullPointerException()).when(coverRepository).findById(Mockito.any());

        // then
        Assertions.assertThatThrownBy(
                () -> coverService.updateCover(multipartFile, 1L, coverModifyDto, memberId))
            .isInstanceOf(NullPointerException.class);
    }

    @Test
    void updateCoverUnAuthentication() throws IOException {

        // given
        File file = new File("src/test/resources/cat.jpeg");

        MultipartFile multipartFile = new MockMultipartFile(file.getName(), file.getName(),
            Files.probeContentType(file.toPath()), Files.readAllBytes(file.toPath()));

        CoverModifyDto coverModifyDto = CoverModifyDto.builder()
            .coverStatusType(CoverStatusType.FINISHED)
            .description("test")
            .title("title")
            .build();

        Long memberId = 2L;
        Genre genre = Genre.builder().id(1L).build();

        Optional<Cover> given = Optional.of(
            Cover.builder()
                .id(1L)
                .coverStatusType(CoverStatusType.SERIALIZED).genre(genre)
                .likes(0L)
                .member(TestUtil.getMember())
                .resource(TestUtil.getMemberProfile())
                .title(coverModifyDto.getTitle())
                .description(coverModifyDto.getDescription())
                .publishDate(LocalDate.of(2023, 4, 17))
                .build());

        // when
        Mockito.doReturn(given).when(coverRepository).findById(Mockito.any());

        Assertions.assertThatThrownBy(
                () -> coverService.updateCover(multipartFile, 1L, coverModifyDto, memberId))
            .isInstanceOf(AuthenticationException.class);

    }

    @Test
    void updateCoverPreviousResourceNull() throws IOException, AuthenticationException {
        // given
        File file = new File("src/test/resources/cat.jpeg");
        MultipartFile multipartFile = new MockMultipartFile(file.getName(), file.getName(),
            Files.probeContentType(file.toPath()), Files.readAllBytes(file.toPath()));

        Resource newResource = new Resource(1L, "test.jpg",
            "newUrl", true, "newThumbnailUrl");

        CoverModifyDto coverModifyDto = CoverModifyDto.builder()
            .coverStatusType(CoverStatusType.FINISHED)
            .description("test")
            .title("title")
            .build();

        Genre genre = Genre.builder().id(1L).build();

        Optional<Cover> given = Optional.of(
            Cover.builder()
                .id(1L)
                .coverStatusType(CoverStatusType.SERIALIZED)
                .genre(Genre.builder().id(2L).build())
                .resource(null)
                .likes(0L)
                .member(TestUtil.getMember())
                .title("test")
                .description("test")
                .publishDate(LocalDate.of(2023, 4, 17))
                .build());

        Cover newCover = Cover.builder()
            .id(1L)
            .coverStatusType(CoverStatusType.FINISHED)
            .genre(genre)
            .likes(0L)
            .member(TestUtil.getMember())
            .resource(newResource)
            .title(coverModifyDto.getTitle())
            .description(coverModifyDto.getDescription())
            .publishDate(LocalDate.of(2023, 4, 17))
            .build();

        // when
        Mockito.doReturn(given).when(coverRepository).findById(Mockito.any());
        Mockito.doReturn(newResource).when(resourceService).saveFile(multipartFile);
        Mockito.doReturn(genre).when(genreRepository).getReferenceById(Mockito.any());
        Mockito.doReturn(newCover).when(coverRepository).save(Mockito.any());
        List<String> result = coverService.updateCover(multipartFile, 1L, coverModifyDto,
            TestUtil.getMember().getId());

        // then
        Assertions.assertThat(result).isEqualTo(null);

    }

    @Test
    void updateCover() throws IOException, AuthenticationException {
        // given
        File file = new File("src/test/resources/cat.jpeg");
        MultipartFile multipartFile = new MockMultipartFile(file.getName(), file.getName(),
            Files.probeContentType(file.toPath()), Files.readAllBytes(file.toPath()));

        Resource oldResource = TestUtil.getMemberProfile();
        Resource newResource = new Resource(1L, "test.jpg",
            "newUrl", true, "newThumbnailUrl");

        CoverModifyDto coverModifyDto = CoverModifyDto.builder()
            .coverStatusType(CoverStatusType.FINISHED)
            .description("test")
            .title("title")
            .build();

        Genre genre = Genre.builder().id(1L).build();

        Optional<Cover> given = Optional.of(
            Cover.builder()
                .id(1L)
                .coverStatusType(CoverStatusType.SERIALIZED)
                .genre(Genre.builder().id(2L).build())
                .resource(oldResource)
                .likes(0L)
                .member(TestUtil.getMember())
                .title("test")
                .description("test")
                .publishDate(LocalDate.of(2023, 4, 17))
                .build());

        Cover newCover = Cover.builder()
            .id(1L)
            .coverStatusType(CoverStatusType.FINISHED)
            .genre(genre)
            .likes(0L)
            .member(TestUtil.getMember())
            .resource(newResource)
            .title(coverModifyDto.getTitle())
            .description(coverModifyDto.getDescription())
            .publishDate(LocalDate.of(2023, 4, 17))
            .build();

        // when
        Mockito.doReturn(given).when(coverRepository).findById(Mockito.any());
        Mockito.doReturn(newResource).when(resourceService).saveFile(multipartFile);
        Mockito.doReturn(genre).when(genreRepository).getReferenceById(Mockito.any());
        Mockito.doReturn(newCover).when(coverRepository).save(Mockito.any());
        List<String> result = coverService.updateCover(multipartFile, 1L, coverModifyDto,
            TestUtil.getMember().getId());

        // then
        Assertions.assertThat(result.contains("path")).isEqualTo(true);
        Assertions.assertThat(result.contains("thumbnailpath")).isEqualTo(true);

    }

    // TODO
    // 1) S3 테스트(Resource가 null이 아닐 때)
    // 2) Multipart file이 null일 때

}