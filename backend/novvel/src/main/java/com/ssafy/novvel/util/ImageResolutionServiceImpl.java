package com.ssafy.novvel.util;

import com.madgag.gif.fmsware.GifDecoder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.concurrent.CompletableFuture;


@Slf4j
@Service
public class ImageResolutionServiceImpl implements ImageResolutionService {
    static final int newWidth = 150;
    static final int newHeight = 150;

    @Override
    @Async("threadPoolTaskExecutor")
    public CompletableFuture<File> makeThumbnailFromGif(File file) throws IOException {

        log.info("start: makeThumbnailFromGif");
        log.info("method: makeThumbnailFromGif {}", Thread.currentThread());
        log.info("method: makeThumbnailFromGif {}", Thread.currentThread().getId());

        InputStream targetStream = new FileInputStream(file);
        GifDecoder gifDecoder = new GifDecoder();
        // 파일 이름 가져오기
        String fileName = getFileName(file);
        File result = new File(fileName + "_thumbnail.gif");
        gifDecoder.read(targetStream);

        //todo gif중간으로 자를지 처음으로 자를지 정할것
        int frameCount = gifDecoder.getFrameCount();

        BufferedImage image = gifDecoder.getFrame(frameCount / 2); // 인덱스에 해당하는 프레임 추출
        ImageIO.write(image, "gif", result);
        log.info("end: makeThumbnailFromGif");
        return CompletableFuture.completedFuture(result);
//        return new AsyncResult<>(result).completable();
//        return result;

    }

    @Override
    @Async("threadPoolTaskExecutor")
    public CompletableFuture<File> convertToPng(File file) throws IOException {
        log.info("start: convertToPng");
        log.info("method: convertToPng {}", Thread.currentThread());
        log.info("method: convertToPng {}", Thread.currentThread().getId());
        File inputFile = file;
        String fileName = getFileName(file);
        log.info("convertToPng: {}", fileName);
        File outputFile = new File(fileName + ".png");
        BufferedImage bufferedImage = ImageIO.read(inputFile);
        ImageIO.write(bufferedImage, "png", outputFile);
        log.info("end: convertToPng");
        return CompletableFuture.completedFuture(outputFile);
//        return new AsyncResult<>(outputFile).completable();
//        return outputFile;
    }

    @Override
    @Async("threadPoolTaskExecutor")
    public CompletableFuture<File> convertToJpg(File file) throws IOException {
        log.info("start: convertToJpg");
        log.info("method: convertToJpg {}", Thread.currentThread());
        log.info("method: convertToJpg {}", Thread.currentThread().getId());
        log.info("method: sconvertToJpg start");
//        try {
//            Thread.sleep(1000);
//            log.info("method: sconvertToJpg stop");
//        } catch (InterruptedException e) {
//            throw new RuntimeException(e);
//        }
        File inputFile = file;
        String fileName = getFileName(file);
        log.info("convertToPng: {}", fileName);
        File outputFile = new File(fileName + ".jpg");
        BufferedImage bufferedImage = ImageIO.read(inputFile);
        ImageIO.write(bufferedImage, "jpg", outputFile);
        log.info("end: convertToJpg");
        return CompletableFuture.completedFuture(outputFile);
//        return new AsyncResult<>(outputFile).completable();
//        return outputFile;
    }


    @Override
    @Async("threadPoolTaskExecutor")
    public CompletableFuture<File> convertResolutionPng(File file, Integer inputWidth, Integer inputHeight) throws IOException {
        log.info("start: convertResolutionPng");
        log.info("method: convertResolutionPng {}", Thread.currentThread());
        log.info("method: convertResolutionPng {}", Thread.currentThread().getId());
        File inputFile = file;
        String fileName = getFileName(file);
        File outputFile = new File(fileName + "_resolution.png");

        BufferedImage inputImage = ImageIO.read(inputFile);
        int width = inputImage.getWidth();
        int height = inputImage.getHeight();
        int resultWidth, resultHeight;

        if (inputWidth == 0 && inputHeight == 0) {
            if (width >= height) {
                resultHeight = newHeight;
                resultWidth = (int) (width / (height / (double) newWidth));
            } else {
                resultWidth = newWidth;
                resultHeight = (int) (height / (width / (double) newHeight));
            }
        } else if (inputWidth == 0 && inputHeight != 0) {
            resultHeight = inputHeight;
            resultWidth = (int) (width / (height / (double) inputHeight));
        } else if (inputWidth != 0 && inputHeight == 0) {
            resultWidth = inputWidth;
            resultHeight = (int) (height / (width / (double) inputWidth));
        } else {
            resultWidth = inputWidth;
            resultHeight = inputHeight;
        }


        // 새로운 BufferedImage 객체를 생성합니다.
//        BufferedImage outputImage = new BufferedImage(inputWidth, newHeight, inputImage.getType());
        BufferedImage outputImage = new BufferedImage(resultWidth, resultHeight, inputImage.getType());
        log.info("origin resolution: w: {}, h: {}", width, height);
        log.info("new resolution: w: {}, h: {}", resultWidth, resultHeight);
        // Graphics2D 객체를 가져옵니다.
        Graphics2D g2d = outputImage.createGraphics();

        // RenderingHints를 설정합니다.
        g2d.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);

        // 새로운 해상도로 이미지를 그립니다.
        g2d.drawImage(inputImage, 0, 0, resultWidth, resultHeight, null);

        // Graphics2D 객체를 해제합니다.
        g2d.dispose();

        // 새로운 이미지를 파일로 출력합니다.
        ImageIO.write(outputImage, "png", outputFile);
        log.info("end: convertResolutionPng");
        return CompletableFuture.completedFuture(outputFile);
//        return new AsyncResult<>(outputFile).completable();
//        return outputFile;
    }


    public String getFileName(File file) {
        String fileName = file.getName();
        int index = fileName.lastIndexOf('.');
        if (index > 0 && index < fileName.length() - 1) {
            fileName = fileName.substring(0, index);
        }
        return fileName;
    }
}
