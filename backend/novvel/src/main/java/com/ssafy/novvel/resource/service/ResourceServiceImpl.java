package com.ssafy.novvel.resource.service;

import com.madgag.gif.fmsware.GifDecoder;
import com.ssafy.novvel.exception.NotSupportFormatException;
import com.ssafy.novvel.resource.entity.Resource;
import com.ssafy.novvel.resource.repository.ResourceRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.image.BufferedImage;
import java.io.*;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class ResourceServiceImpl implements ResourceService {

    private final S3Service s3Service;
    private final ResourceRepository resourceRepository;
    static final int newWidth = 150;
    static final int newHeight = 150;

    @Override
    public Resource saveFile(MultipartFile multipartFile) throws IOException {
        Resource result = null;
        File file = null;
        try {
            file = convert(multipartFile);
            result = saveFile(file);
        } finally {
            if (file != null) {
                file.delete();
            }
        }
        return result;
    }

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
                    thumbnail = convertResolutionPng(mid, newWidth, newHeight);
                    resourceEntity = new Resource(file.getName(), fileNamePrefix + file.getName(),
                            fileNamePrefix + thumbnail.getName(), true);
                    break;
                case ".png":
                    thumbnail = convertResolutionPng(file, newWidth, newHeight);
                    resourceEntity = new Resource(file.getName(), fileNamePrefix + file.getName(),
                            fileNamePrefix + thumbnail.getName(), true);
                    break;
                case ".gif":
                    mid = makeThumbnailFromGif(file);
                    thumbnail = convertResolutionPng(mid, newWidth, newHeight);
                    resourceEntity = new Resource(file.getName(), fileNamePrefix + file.getName(),
                            fileNamePrefix + thumbnail.getName(), true);
                    break;

                case ".mp3":
                case ".wma":
                case ".wav":
                    resourceEntity = new Resource(file.getName(), fileNamePrefix + file.getName(), false);
                    break;
                default:
                    throw new NotSupportFormatException();
            }

            url = s3Service.uploadFile(file, fileNamePrefix + file.getName());

            resourceEntity.setUrl(url);
            if (thumbnail != null) {
                String thumbnailUrl = s3Service.uploadFile(thumbnail, fileNamePrefix + thumbnail.getName());
                resourceEntity.setThumbnailUrl(thumbnailUrl);
            }
            resourceEntity = resourceRepository.save(resourceEntity);

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

    private File makeThumbnailFromGif(File file) throws IOException {

        log.info("makeThumbnailFromGif: {}", file.getName());

        InputStream targetStream = new FileInputStream(file);
        GifDecoder gifDecoder = new GifDecoder();
        // 파일 이름 가져오기
        String fileName = getFineName(file);
        File result = new File(fileName + "_thumbnail.gif");
        gifDecoder.read(targetStream);

        //todo gif중간으로 자를지 처음으로 자를지 정할것
        int frameCount = gifDecoder.getFrameCount();

        BufferedImage image = gifDecoder.getFrame(frameCount/2); // 인덱스에 해당하는 프레임 추출
        ImageIO.write(image, "gif", result);

        return result;

    }

    private File convertToPng(File file) throws IOException {
        File inputFile = file;
        String fileName = getFineName(file);
        log.info("convertToPng: {}", fileName);
        File outputFile = new File(fileName + ".png");
        BufferedImage bufferedImage = ImageIO.read(inputFile);
        ImageIO.write(bufferedImage, "png", outputFile);
        return outputFile;
    }

    private File convertToJpg(File file) throws IOException {
        File inputFile = file;
        String fileName = getFineName(file);
        log.info("convertToPng: {}", fileName);
        File outputFile = new File(fileName + ".jpg");
        BufferedImage bufferedImage = ImageIO.read(inputFile);
        ImageIO.write(bufferedImage, "jpg", outputFile);
        return outputFile;
    }


    private File convertResolutionPng(File file, Integer inputWidth, Integer inputHeight) throws IOException {
        File inputFile = file;
        String fileName = getFineName(file);
        File outputFile = new File(fileName + "_resolution.png");

        BufferedImage inputImage = ImageIO.read(inputFile);
        int width = inputImage.getWidth();
        int height = inputImage.getHeight();
        int resultWidth, resultHeight;

        if (width >= height) {
            resultWidth = (int) (width / (height / (double) newWidth));
            resultHeight = newHeight;
        } else {
            resultWidth = newWidth;
            resultHeight = (int) (height / (width / (double) newHeight));
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

    private File convert(MultipartFile file) throws IOException {
        File convFile = new File(file.getOriginalFilename());
        convFile.createNewFile();
        FileOutputStream fos = new FileOutputStream(convFile);
        fos.write(file.getBytes());
        fos.close();
        return convFile;
    }

}
