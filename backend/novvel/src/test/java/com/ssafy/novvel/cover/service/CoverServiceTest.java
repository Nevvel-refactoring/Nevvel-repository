package com.ssafy.novvel.cover.service;

import com.ssafy.novvel.cover.dto.CoverInfoAndEpisodesDto;
import com.ssafy.novvel.cover.dto.CoverModifyDto;
import com.ssafy.novvel.cover.dto.CoverRegisterDto;
import com.ssafy.novvel.cover.dto.CoverWriter;
import com.ssafy.novvel.cover.dto.EpisodeInfoDto;
import com.ssafy.novvel.cover.entity.Cover;
import com.ssafy.novvel.cover.entity.CoverStatusType;
import com.ssafy.novvel.cover.repository.CoverRepository;
import com.ssafy.novvel.cover.repository.LikedCoverRepository;
import com.ssafy.novvel.cover.util.DefaultImage;
import com.ssafy.novvel.episode.repository.ReadEpisodeRepository;
import com.ssafy.novvel.exception.NotYourAuthorizationException;
import com.ssafy.novvel.genre.entity.Genre;
import com.ssafy.novvel.genre.repository.GenreRepository;
import com.ssafy.novvel.member.entity.Member;
import com.ssafy.novvel.resource.entity.Resource;
import com.ssafy.novvel.resource.repository.ResourceRepository;
import com.ssafy.novvel.resource.service.ResourceService;
import com.ssafy.novvel.transactionhistory.entity.PointChangeType;
import com.ssafy.novvel.util.TestUtil;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Disabled;
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
    ReadEpisodeRepository readEpisodeRepository;

    @Mock
    ResourceService resourceService;

    @Mock
    ResourceRepository resourceRepository;

    @Mock
    LikedCoverRepository likedCoverRepository;

//    @Mock
//    DefaultImage defaultImage;

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
            .member(TestUtil.getUSERMember().orElse(null)).resource(resource)
            .title(coverRegisterDto.getTitle()).build();

        // when
        Mockito.doReturn(resource).when(resourceService).saveFile(multipartFile);
        Mockito.doReturn(genre).when(genreRepository)
            .getReferenceById(Mockito.any());
        Mockito.doReturn(expect).when(coverRepository).save(Mockito.any());
        Cover result = coverService.registerCover(multipartFile, coverRegisterDto,
            TestUtil.getUSERMember().orElse(null));

        // then
        Assertions.assertThat(result.getCoverStatusType()).isEqualTo(expect.getCoverStatusType());
        Assertions.assertThat(result.getTitle()).isEqualTo(expect.getTitle());
        Assertions.assertThat(result.getGenre()).isEqualTo(expect.getGenre());
        Assertions.assertThat(result.getResource()).isEqualTo(expect.getResource());

    }

    @Test
    void getAllEpisode() {

        // given
        Member member = TestUtil.getMember();
        Genre genre = Genre.builder().id(1L).name("test_genre").build();
        Cover given = Cover.builder()
            .id(1L).coverStatusType(CoverStatusType.SERIALIZED).genre(genre)
            .member(TestUtil.getUSERMember().orElse(null))
            .resource(TestUtil.getResource())
            .title("test").build();

        List<EpisodeInfoDto> list = new ArrayList<>();
        list.add(new EpisodeInfoDto(1L, "test", 0L, 0L, LocalDateTime.now(),
            PointChangeType.BUY_EPISODE, true));
        list.add(new EpisodeInfoDto(2L, "test", 0L, 0L, LocalDateTime.now(),
            PointChangeType.SELL_EPISODE, true));

        CoverInfoAndEpisodesDto expect = CoverInfoAndEpisodesDto.builder()
            .episodes(list)
            .genre(given.getGenre().toDto())
            .title(given.getTitle())
            .writer(new CoverWriter(given.getMember().getId(),
                given.getMember().getNickname()))
            .build();

        // when
        Mockito.doReturn(given).when(coverRepository).findCoverById(1L);
        Mockito.doReturn(list).when(coverRepository).findEpisodesInfoDto(given, member);
        Mockito.doReturn(Optional.empty()).when(likedCoverRepository)
            .findByMember_IdAndCover_Id(member.getId(), 1L);
        CoverInfoAndEpisodesDto result = coverService.getAllEpisodes(1L, member);

        // then
        Assertions.assertThat(result.getTitle()).isEqualTo(expect.getTitle());
        Assertions.assertThat(result.getDescription()).isEqualTo(expect.getDescription());
        Assertions.assertThat(result.getGenre().getId()).isEqualTo(expect.getGenre().getId());
        Assertions.assertThat(result.getEpisodes().size()).isEqualTo(expect.getEpisodes().size());
        Assertions.assertThat(result.getEpisodes().get(0).getIsPurchased()).isEqualTo(true);
        Assertions.assertThat(result.getEpisodes().get(1).getIsPurchased()).isEqualTo(false);
        Assertions.assertThat(result.getIsLiked()).isEqualTo(false);
    }

    @Test
    void updateCoverNullPointException() throws IOException {

        // given
        File file = new File("src/test/resources/cat.jpeg");

        MultipartFile multipartFile = new MockMultipartFile(file.getName(), file.getName(),
            Files.probeContentType(file.toPath()), Files.readAllBytes(file.toPath()));

        CoverModifyDto coverModifyDto = CoverModifyDto.builder()
            .status(CoverStatusType.FINISHED)
            .description("test")
            .title("title")
            .build();

        Long memberId = 1L;

        // when
        Mockito.doThrow(new NullPointerException()).when(coverRepository)
            .findCoverById(Mockito.any());

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
            .status(CoverStatusType.FINISHED)
            .description("test")
            .title("title")
            .build();

        Long memberId = 2L;
        Genre genre = Genre.builder().id(1L).build();

        Cover given = Cover.builder()
            .id(1L)
            .coverStatusType(CoverStatusType.SERIALIZED).genre(genre)
            .likes(0L)
            .member(TestUtil.getMember())
            .resource(TestUtil.getMemberProfile())
            .title(coverModifyDto.getTitle())
            .description(coverModifyDto.getDescription())
            .firstPublishDate(LocalDate.of(2023, 4, 17))
            .lastPublishDate(LocalDate.of(2023, 4, 17))
            .build();

        // when
        Mockito.doReturn(given).when(coverRepository).findCoverById(Mockito.any());

        Assertions.assertThatThrownBy(
                () -> coverService.updateCover(multipartFile, 1L, coverModifyDto, memberId))
            .isInstanceOf(NotYourAuthorizationException.class);
    }

    @Test
    void getAllEpisodeNotExistCover() {

        // given
        Member member = TestUtil.getMember();

        // when
        Assertions.assertThatThrownBy(() -> coverService.getAllEpisodes(1L, member))
            .isInstanceOf(NullPointerException.class);

    }

    @Test
    void updateCoverPreviousResourceNull() throws IOException, NotYourAuthorizationException {
        // given
        File file = new File("src/test/resources/cat.jpeg");
        MultipartFile multipartFile = new MockMultipartFile(file.getName(), file.getName(),
            Files.probeContentType(file.toPath()), Files.readAllBytes(file.toPath()));

        Resource newResource = new Resource(1L, "test.jpg",
            "newUrl", "test", "newThumbnailUrl", true, "test");

        CoverModifyDto coverModifyDto = CoverModifyDto.builder()
            .status(CoverStatusType.FINISHED)
            .description("test")
            .title("title")
            .build();

        Genre genre = Genre.builder().id(1L).build();

        Cover given = Cover.builder()
            .id(1L)
            .coverStatusType(CoverStatusType.SERIALIZED)
            .genre(Genre.builder().id(2L).build())
            .resource(null)
            .likes(0L)
            .member(TestUtil.getMember())
            .title("test")
            .description("test")
            .firstPublishDate(LocalDate.of(2023, 4, 17))
            .lastPublishDate(LocalDate.of(2023, 4, 17))
            .build();

        Cover newCover = Cover.builder()
            .id(1L)
            .coverStatusType(CoverStatusType.FINISHED)
            .genre(genre)
            .likes(0L)
            .member(TestUtil.getMember())
            .resource(newResource)
            .title(coverModifyDto.getTitle())
            .description(coverModifyDto.getDescription())
            .firstPublishDate(LocalDate.of(2023, 4, 17))
            .lastPublishDate(LocalDate.of(2023, 4, 17))
            .build();

        // when
        Mockito.doReturn(given).when(coverRepository).findCoverById(Mockito.any());
        Mockito.doReturn(newResource).when(resourceService).saveFile(multipartFile);
        Mockito.doReturn(genre).when(genreRepository).getReferenceById(Mockito.any());
        Mockito.doReturn(newCover).when(coverRepository).save(Mockito.any());
        Resource result = coverService.updateCover(multipartFile, 1L, coverModifyDto,
            TestUtil.getMember().getId());

        // then
        Assertions.assertThat(result).isEqualTo(null);

    }

    @Test
    void updateCover() throws IOException, NotYourAuthorizationException {
        // given
        File file = new File("src/test/resources/cat.jpeg");
        MultipartFile multipartFile = new MockMultipartFile(file.getName(), file.getName(),
            Files.probeContentType(file.toPath()), Files.readAllBytes(file.toPath()));

        Resource oldResource = TestUtil.getMemberProfile();
        Resource newResource = new Resource(2L, "cat.jpeg",
            "newUrl", "test", "newUrl", true, "newThumbnailUrl");

        CoverModifyDto coverModifyDto = CoverModifyDto.builder()
            .status(CoverStatusType.FINISHED)
            .description("test")
            .title("title")
            .build();

        Genre genre = Genre.builder().id(1L).build();

        Cover given = Cover.builder()
            .id(1L)
            .coverStatusType(CoverStatusType.SERIALIZED)
            .genre(genre)
            .resource(oldResource)
            .likes(0L)
            .member(TestUtil.getMember())
            .title("test")
            .description("test")
            .firstPublishDate(LocalDate.of(2023, 4, 17))
            .lastPublishDate(LocalDate.of(2023, 4, 17))
            .build();

        Cover newCover = Cover.builder()
            .id(1L)
            .coverStatusType(CoverStatusType.FINISHED)
            .genre(genre)
            .likes(0L)
            .member(TestUtil.getMember())
            .resource(newResource)
            .title(coverModifyDto.getTitle())
            .description(coverModifyDto.getDescription())
            .firstPublishDate(LocalDate.of(2023, 4, 17))
            .lastPublishDate(LocalDate.of(2023, 4, 17))
            .build();

        // when
        Mockito.doReturn(given).when(coverRepository).findCoverById(1L);
        Mockito.doReturn(newResource).when(resourceService).saveFile(multipartFile);
        Mockito.doReturn(genre).when(genreRepository).getReferenceById(Mockito.any());
        Mockito.doReturn(newCover).when(coverRepository).save(Mockito.any());
        Mockito.doNothing().when(resourceRepository).delete(Mockito.any());
        Resource result = coverService.updateCover(multipartFile, 1L, coverModifyDto,
            TestUtil.getMember().getId());

        // then
        Assertions.assertThat(result.getId()).isEqualTo(oldResource.getId());

    }

    // TODO
    // 1) S3 테스트(Resource가 null이 아닐 때)
    // 2) Multipart file이 null일 때
}