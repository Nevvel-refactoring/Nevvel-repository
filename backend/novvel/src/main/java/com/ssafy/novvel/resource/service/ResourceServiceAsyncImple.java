package com.ssafy.novvel.resource.service;

import com.ssafy.novvel.exception.NotSupportFormatException;
import com.ssafy.novvel.resource.entity.Resource;
import com.ssafy.novvel.resource.repository.ResourceRepository;
import com.ssafy.novvel.util.ImageResolutionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

@Service
@RequiredArgsConstructor
@Slf4j
public class ResourceServiceAsyncImple implements ResourceService {

    private final S3Service s3Service;
    private final ResourceRepository resourceRepository;
    private final ImageResolutionService imageResolutionService;



    @Override
    @Transactional
    public Resource saveFile(MultipartFile multipartFile) throws IOException {
//        log.info("method: saveFile {}", TransactionSynchronizationManager.isActualTransactionActive());

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
//        log.info("method: saveFile {}", TransactionSynchronizationManager.isActualTransactionActive());
        long beforeTime = System.currentTimeMillis(); //코드 실행 전에 시간 받아오기
        String fileExtension = getFileExtension(file);
        String fileNamePrefix = "files/" + LocalDate.now(ZoneId.of("Asia/Seoul")) + UUID.randomUUID() + "-";
        CompletableFuture<File> completableFutureMid = null;
        CompletableFuture<File> completableFutureThumbnail = null,
                completableFutureThumbnailWidth = null,
                completableFutureThumbnailHeight = null;
        String url = null;

        Resource resourceEntity = null;
        try {
            switch (fileExtension) {
                case ".jpg":
                case ".jpeg":
                    completableFutureMid = imageResolutionService.convertToPng(file);
                    completableFutureThumbnail = imageResolutionService.convertResolutionPng(completableFutureMid.get(), 0, 0);
                    resourceEntity = new Resource(file.getName(), fileNamePrefix + file.getName(),
                            fileNamePrefix + getFileName(file, "_resolution.png"), true);
                    break;
                case ".png":
                    completableFutureThumbnail = imageResolutionService.convertResolutionPng(file, 0, 0);
                    resourceEntity = new Resource(file.getName(), fileNamePrefix + file.getName(),
                            fileNamePrefix + getFileName(file, "_resolution.png"), true);
                    break;
                case ".gif":
                    completableFutureMid = imageResolutionService.makeThumbnailFromGif(file);
                    completableFutureThumbnail = imageResolutionService.convertResolutionPng(completableFutureMid.get(), 0, 0);
//                    completableFutureThumbnailWidth = imageResolutionService.convertResolutionPng(completableFutureMid.get(), 100, 0);
//                    completableFutureThumbnailHeight = imageResolutionService.convertResolutionPng(completableFutureMid.get(), 0, 100);
                    resourceEntity = new Resource(file.getName(), fileNamePrefix + file.getName(),
                            fileNamePrefix + getFileName(file, "_resolution.png"), true);
//                    completableFutureThumbnailWidth.get();
//                    completableFutureThumbnailHeight.get();
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

            if (completableFutureThumbnail != null && completableFutureThumbnail.get() != null) {
                String thumbnailUrl = s3Service.uploadFile(completableFutureThumbnail.get(),
                        fileNamePrefix + completableFutureThumbnail.get().getName());
                resourceEntity.setThumbnailUrl(thumbnailUrl);
            }
            resourceEntity = resourceRepository.save(resourceEntity);

        } catch (ExecutionException e) {
            throw new RuntimeException(e);
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        } finally {
            if (completableFutureThumbnail != null) {
                completableFutureThumbnail.join().delete();
            }
            if (completableFutureThumbnailWidth != null) {
                completableFutureThumbnailWidth.join().delete();
            }
            if (completableFutureThumbnailHeight != null) {
                completableFutureThumbnailHeight.join().delete();
            }
            if (completableFutureMid != null) {
                completableFutureMid.join().delete();
            }


            long afterTime = System.currentTimeMillis(); // 코드 실행 후에 시간 받아오기
            long secDiffTime = (afterTime - beforeTime) / 1000; //두 시간에 차 계산
            log.info("saveFile 동작시간: {}", secDiffTime);
            return resourceEntity;
        }
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

    public String getFileName(File file, String extention) {
        String fileName = file.getName();
        int index = fileName.lastIndexOf('.');
        if (index > 0 && index < fileName.length() - 1) {
            fileName = fileName.substring(0, index);
        }
        return fileName + extention;
    }


}
