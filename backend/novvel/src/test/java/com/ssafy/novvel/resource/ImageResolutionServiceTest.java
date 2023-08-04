package com.ssafy.novvel.resource;

import com.ssafy.novvel.config.async.SpringAsyncConfig;
import com.ssafy.novvel.util.ImageResolutionService;
import com.ssafy.novvel.util.ImageResolutionServiceImpl;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

//@ExtendWith(MockitoExtension.class)
@SpringBootTest
@AutoConfigureMockMvc
@ActiveProfiles("integration")
public class ImageResolutionServiceTest {

    @Autowired
    SpringAsyncConfig springAsyncConfig;
    ImageResolutionService imageResolutionService = new ImageResolutionServiceImpl();

    @Test
//    @Disabled
    @DisplayName("get gif thumbnail img")
    void makeThumbnailFromGifTest() throws  IOException, ExecutionException, InterruptedException {
        File file = new File("src/test/resources/test.gif");
//        Method makeThumbnailFromGifMethod = ResourceServiceImpl.class.getDeclaredMethod("makeThumbnailFromGif", File.class);
//        makeThumbnailFromGifMethod.setAccessible(true);
//        File result = (File) makeThumbnailFromGifMethod.invoke(resourceService, file);
        File result = imageResolutionService.makeThumbnailFromGif(file).get();
        Assertions.assertThat(result.getName()).isEqualTo("test_thumbnail.gif");
        result.delete();

    }

    @Test
//    @Disabled
    @DisplayName("convert gif to png")
    void convertGifToPngTest() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException, IOException, ExecutionException, InterruptedException {
        File file = new File("src/test/resources/test_thumbnail.gif");
//        Method makeThumbnailFromGifMethod = ResourceServiceImpl.class.getDeclaredMethod("convertToPng", File.class);
//        makeThumbnailFromGifMethod.setAccessible(true);
//        File result = (File) makeThumbnailFromGifMethod.invoke(resourceService, file);
        File result = imageResolutionService.convertToPng(file).get();
        result.delete();

    }

    @Test
//    @Disabled
    @DisplayName("convert gif to jpg")
    void convertGifToJpgTest() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException, IOException, ExecutionException, InterruptedException {
        File file = new File("src/test/resources/test_thumbnail.gif");
//        Method makeThumbnailFromGifMethod = ResourceServiceImpl.class.getDeclaredMethod("convertToJpg", File.class);
//        makeThumbnailFromGifMethod.setAccessible(true);
//        File result = (File) makeThumbnailFromGifMethod.invoke(resourceService, file);
        File result = imageResolutionService.convertToJpg(file).get();
        result.delete();

    }

    @Test
//    @Disabled
    @DisplayName("convert jpg to png")
    void convertJpgToPngTest() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException, IOException, ExecutionException, InterruptedException {
        File file = new File("src/test/resources/test.jpg");
//        Method makeThumbnailFromGifMethod = ResourceServiceImpl.class.getDeclaredMethod("convertToPng", File.class);
//        makeThumbnailFromGifMethod.setAccessible(true);
//        File result = (File) makeThumbnailFromGifMethod.invoke(resourceService, file);
        File result = imageResolutionService.convertToPng(file).get();
        result.delete();

    }

    @Test
//    @Disabled
    @DisplayName("convert Height Resolution Png")
    void convertResolutionPngHeightTest() throws InvocationTargetException, IllegalAccessException, NoSuchMethodException, IOException, ExecutionException, InterruptedException {
        File file = new File("src/test/resources/p.png");
//        Method makeThumbnailFromGifMethod =
//                ResourceServiceImpl.class.getDeclaredMethod("convertResolutionPng", File.class, Integer.class, Integer.class);
//        makeThumbnailFromGifMethod.setAccessible(true);
//        File result = (File) makeThumbnailFromGifMethod.invoke(resourceService, file, 200, 200);
        File result = imageResolutionService.convertResolutionPng(file,200,200).get();
        result.delete();
    }

    @Test
//    @Disabled
    @DisplayName("convert Width Resolution Png")
    void convertResolutionPngWidthTest() throws InvocationTargetException, IllegalAccessException, NoSuchMethodException, IOException, ExecutionException, InterruptedException {
        File file = new File("src/test/resources/p2.png");
//        Method makeThumbnailFromGifMethod =
//                ResourceServiceImpl.class.getDeclaredMethod("convertResolutionPng", File.class, Integer.class, Integer.class);
//        makeThumbnailFromGifMethod.setAccessible(true);
//        File result = (File) makeThumbnailFromGifMethod.invoke(resourceService, file, 200, 200);
        File result = imageResolutionService.convertResolutionPng(file,200,200).get();
        result.delete();
    }
    @Test
//    @Disabled
    @DisplayName("du")
    void du() throws NoSuchMethodException, InvocationTargetException, IllegalAccessException, IOException, ExecutionException, InterruptedException {
        File file = new File("src/test/resources/test_thumbnail.gif");
        File file2 = new File("src/test/resources/test.gif");
//        Method makeThumbnailFromGifMethod = ResourceServiceImpl.class.getDeclaredMethod("convertToJpg", File.class);
//        makeThumbnailFromGifMethod.setAccessible(true);
//        File result = (File) makeThumbnailFromGifMethod.invoke(resourceService, file);
//        File result = imageResolutionService.convertToJpg(file).get();
//        File result2 = imageResolutionService.makeThumbnailFromGif(file).get();
        CompletableFuture<File> completableFuture = imageResolutionService.convertToJpg(file);
        CompletableFuture<File> completableFuture2 = imageResolutionService.makeThumbnailFromGif(file);
//        File result = completableFuture.get();
//        File result2 = completableFuture2.get();
//        result.delete();
//        result2.delete();

//        Method makeThumbnailFromGifMethod = ResourceServiceImpl.class.getDeclaredMethod("makeThumbnailFromGif", File.class);
//        makeThumbnailFromGifMethod.setAccessible(true);
//        File result = (File) makeThumbnailFromGifMethod.invoke(resourceService, file);


    }

}
