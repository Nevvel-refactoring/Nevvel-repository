package com.ssafy.novvel.file.service;

import com.madgag.gif.fmsware.GifDecoder;
import com.ssafy.novvel.exception.NotSupportFormatException;
import com.ssafy.novvel.file.entity.Resource;
import com.ssafy.novvel.file.repository.ResourceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class ResourceServiceImpl implements ResourceService {

    private final AwsProxyService awsProxyService;
    private final ResourceRepository resourceRepository;


    @Override
    @Transactional
    public Resource saveFile(File file) throws IOException {
        String fileExtension = getFileExtension(file);
        String fileNamePrefix = "files/" + LocalDate.now(ZoneId.of("Asia/Seoul")) + UUID.randomUUID() + "-";
        File thumbnail = null, mid = null;
        String url = null;

        Resource resourceEntity = null;
        try {
            switch (fileExtension) {
                case ".jpg":
                case ".jpeg":
                    mid = convertToPng(file);
                    thumbnail = convertResolutionPng(mid, 200, 200);
                    resourceEntity = new Resource(file.getName(), true);
                    break;
                case ".png":
                    thumbnail = convertResolutionPng(file, 200, 200);
                    resourceEntity = new Resource(file.getName(), true);
                    break;
                case ".gif":
                    mid = makeThumbnailFromGif(file);
                    thumbnail = convertResolutionPng(mid, 200, 200);
                    resourceEntity = new Resource(file.getName(), true);
                    break;

                case ".mp3":
                case ".wma":
                    resourceEntity = new Resource(file.getName(), false);
                    break;
                default:
                    throw new NotSupportFormatException();
            }

            url = awsProxyService.uploadFile(file, fileNamePrefix + file.getName());

            resourceEntity.setUrl(url);
            if (thumbnail != null) {
                String thumbnailUrl = awsProxyService.uploadFile(thumbnail, fileNamePrefix + thumbnail.getName());
                resourceEntity.setThumbnailUrl(thumbnailUrl);
            }
            resourceRepository.save(resourceEntity);

        } finally {
            if (thumbnail != null) {
                thumbnail.delete();
            }
            if (mid != null) {
                mid.delete();
            }
        }
        return resourceEntity;
    }

    @Override
    public String findOriginByFileName(String fileName) {
        return null;
    }

    @Override
    public String findThumbnailByFileName(String fileName) {
        return null;
    }


    public File makeThumbnailFromGif(File file) throws IOException {

        log.info("makeThumbnailFromGif: {}", file.getName());

        InputStream targetStream = new FileInputStream(file);
        GifDecoder gifDecoder = new GifDecoder();
        // 파일 이름 가져오기
        String fileName = getFineName(file);
        File result = new File(fileName + "_thumbnail.gif");
        gifDecoder.read(targetStream);

        //todo gif중간으로 자를지 처음으로 자를지 정할것
        int frameCount = gifDecoder.getFrameCount();

        BufferedImage image = gifDecoder.getFrame(0); // 인덱스에 해당하는 프레임 추출
        ImageIO.write(image, "gif", result);

        return result;

    }

    @Override
    public File convertToPng(File file) throws IOException {
        File inputFile = file;
        String fileName = getFineName(file);
        log.info("convertToPng: {}", fileName);
        File outputFile = new File(fileName + ".png");
        BufferedImage bufferedImage = ImageIO.read(inputFile);
        ImageIO.write(bufferedImage, "png", outputFile);
        return outputFile;
    }

    @Override
    public File convertToJpg(File file) throws IOException {
        File inputFile = file;
        String fileName = getFineName(file);
        log.info("convertToPng: {}", fileName);
        File outputFile = new File(fileName + ".jpg");
        BufferedImage bufferedImage = ImageIO.read(inputFile);
        ImageIO.write(bufferedImage, "jpg", outputFile);
        return outputFile;
    }


    @Override
    public File convertResolutionPng(File file, int newWidth, int newHeight) throws IOException {
        File inputFile = file;
        String fileName = getFineName(file);
        File outputFile = new File(fileName + "_resolution.png");

        BufferedImage inputImage = ImageIO.read(inputFile);
//        int width = inputImage.getWidth();
//        int height = inputImage.getHeight();


        // 새로운 BufferedImage 객체를 생성합니다.
        BufferedImage outputImage = new BufferedImage(newWidth, newHeight, inputImage.getType());

        // Graphics2D 객체를 가져옵니다.
        Graphics2D g2d = outputImage.createGraphics();

        // RenderingHints를 설정합니다.
        g2d.setRenderingHint(RenderingHints.KEY_INTERPOLATION, RenderingHints.VALUE_INTERPOLATION_BILINEAR);

        // 새로운 해상도로 이미지를 그립니다.
        g2d.drawImage(inputImage, 0, 0, newWidth, newHeight, null);

        // Graphics2D 객체를 해제합니다.
        g2d.dispose();

        // 새로운 이미지를 파일로 출력합니다.
        ImageIO.write(outputImage, "png", outputFile);

        return outputFile;
    }


    private String getFineName(File file) {
        String fileName = file.getName();
        int index = fileName.lastIndexOf('.');
        if (index > 0 && index < fileName.length() - 1) {
            fileName = fileName.substring(0, index);
        }
        return fileName;
    }

    private String getFileExtension(File file) {
        String fileName = file.getName();
        int index = fileName.lastIndexOf('.');
        return fileName.substring(index);
    }

}
