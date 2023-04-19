package com.ssafy.novvel.file;

import com.ssafy.novvel.file.entity.Resource;
import com.ssafy.novvel.file.repository.ResourceRepository;
import com.ssafy.novvel.file.service.AwsProxyServiceImpl;
import com.ssafy.novvel.file.service.ResourceServiceImpl;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.Spy;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.File;
import java.io.IOException;

@ExtendWith(MockitoExtension.class)
class ResourceServiceTest {

    @InjectMocks
    private ResourceServiceImpl resourceService;
    @Mock
    private ResourceRepository resourceRepository;

    @Spy
    private AwsProxyServiceImpl awsProxyService;

    @Test
//    @Disabled
    @DisplayName("fileSaveGifTest")
    void fileSaveGifTest() throws IOException {

        //given
        File file = new File("src/test/resources/test.gif");
        Resource expect = Resource.builder()
                .id(1L)
                .originName("test.gif")
                .url("src/java/resources/uuid-test.gif")
                .isThumbnail(true)
                .thumbnailUrl("src/java/resources/uuid-test_thumbnail.gif")
                .build();

        //when
        Mockito.doReturn(expect).when(resourceRepository).save(Mockito.any());
        resourceService = new ResourceServiceImpl(awsProxyService, resourceRepository);

        //then
        Resource result = resourceService.saveFile(file);
        File resultOrigin = new File(result.getUrl());
        File resultThumbnail = new File(result.getThumbnailUrl());

        Assertions.assertThat(result.getUrl()).isNotNull();
        Assertions.assertThat(resultOrigin.canRead()).isTrue();
        Assertions.assertThat(resultThumbnail.canRead()).isTrue();
        resultOrigin.delete();
        resultThumbnail.delete();
    }


    @Test
//    @Disabled
    @DisplayName("fileSaveJTest")
    void fileSaveJpgTest() throws IOException {

        //given
        File file = new File("src/test/resources/test.jpg");
        Resource expect = Resource.builder()
                .id(1L)
                .originName("test.jpg")
                .url("src/java/resources/uuid-test.jpg")
                .isThumbnail(true)
                .thumbnailUrl("src/java/resources/uuid-test_thumbnail.jpg")
                .build();

        //when
        Mockito.doReturn(expect).when(resourceRepository).save(Mockito.any());
        resourceService = new ResourceServiceImpl(awsProxyService, resourceRepository);

        //then
        Resource result = resourceService.saveFile(file);
        File resultOrigin = new File(result.getUrl());
        File resultThumbnail = new File(result.getThumbnailUrl());

        Assertions.assertThat(result.getUrl()).isNotNull();
        Assertions.assertThat(resultOrigin.canRead()).isTrue();
        Assertions.assertThat(resultThumbnail.canRead()).isTrue();
        resultOrigin.delete();
        resultThumbnail.delete();
    }

    @Test
//    @Disabled
    @DisplayName("fileSaveMp3Test")
    void fileSaveMp3Test() throws IOException {

        //given
        File file = new File("src/test/resources/sample.mp3");
        Resource expect = Resource.builder()
                .id(1L)
                .originName("sample.mp3")
                .url("src/java/resources/uuid-sample.mp3")
                .isThumbnail(true)
                .thumbnailUrl("src/java/resources/uuid-sample_thumbnail.mp3")
                .build();

        //when
        Mockito.doReturn(expect).when(resourceRepository).save(Mockito.any());
        resourceService = new ResourceServiceImpl(awsProxyService, resourceRepository);

        //then
        Resource result = resourceService.saveFile(file);
        File resultOrigin = new File(result.getUrl());

        Assertions.assertThat(result.getUrl()).isNotNull();
        Assertions.assertThat(resultOrigin.canRead()).isTrue();
//        resultOrigin.delete();
    }


    @Test
//    @Disabled
    @DisplayName("get gif thumbnail img")
    void makeThumbnailFromGifTest() throws IOException {
        File file = new File("src/test/resources/test.gif");
        File result = resourceService.makeThumbnailFromGif(file);
        result.delete();

    }

    @Test
//    @Disabled
    @DisplayName("convert gif to png")
    void convertGifToPngTest() throws IOException {
        File file = new File("src/test/resources/test_thumbnail.gif");
        File result = resourceService.convertToPng(file);
        result.delete();

    }

    @Test
//    @Disabled
    @DisplayName("convert gif to jpg")
    void convertGifToJpgTest() throws IOException {
        File file = new File("src/test/resources/test_thumbnail.gif");
        File result = resourceService.convertToJpg(file);
        result.delete();

    }

    @Test
//    @Disabled
    @DisplayName("convert jpg to png")
    void convertJpgToPngTest() throws IOException {
        File file = new File("src/test/resources/test.jpg");
        File result = resourceService.convertToJpg(file);
        result.delete();

    }

    @Test
//    @Disabled
    @DisplayName("convert Resolution Png")
    void convertResolutionPngTest() throws IOException {
        File file = new File("src/test/resources/test_thumbnail.png");
        File result = resourceService.convertResolutionPng(file, 200, 200);
        result.delete();
    }

}
