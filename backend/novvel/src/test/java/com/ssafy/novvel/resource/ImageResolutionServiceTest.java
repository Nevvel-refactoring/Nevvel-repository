package com.ssafy.novvel.resource;

import com.ssafy.novvel.util.ImageResolutionService;
import com.ssafy.novvel.util.ImageResolutionServiceImpl;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;

import java.io.File;
import java.io.IOException;
import java.lang.reflect.InvocationTargetException;
import java.util.concurrent.ExecutionException;

@ExtendWith(MockitoExtension.class)
public class ImageResolutionServiceTest {

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

}
