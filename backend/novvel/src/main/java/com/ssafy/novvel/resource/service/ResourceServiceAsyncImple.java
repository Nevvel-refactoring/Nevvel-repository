package com.ssafy.novvel.resource.service;

import com.ssafy.novvel.exception.NotSupportFormatException;
import com.ssafy.novvel.resource.entity.Resource;
import com.ssafy.novvel.resource.repository.ResourceRepository;
import com.ssafy.novvel.util.ImageResolutionService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.transaction.support.TransactionSynchronizationManager;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;

//@Service
@RequiredArgsConstructor
//@Slf4j
public class ResourceServiceAsyncImple implements ResourceService {

    private final S3Service s3Service;
    private final ResourceRepository resourceRepository;
    private final ImageResolutionService imageResolutionService;
    static final int newWidth = 150;
    static final int newHeight = 150;

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

        String fileExtension = getFileExtension(file);
        String fileNamePrefix = "files/" + LocalDate.now(ZoneId.of("Asia/Seoul")) + UUID.randomUUID() + "-";
        File s = null;
        File mid = null;
        CompletableFuture<File> completableFutureMid = null, completableFutureThumbnail = null;
        String url = null;

        Resource resourceEntity = null;
        try {
            switch (fileExtension) {
                case ".jpg":
                case ".jpeg":
                    completableFutureMid = imageResolutionService.convertToPng(file);
                    completableFutureThumbnail = imageResolutionService.convertResolutionPng(completableFutureMid.get(), newWidth, newHeight);
                    resourceEntity = new Resource(file.getName(), fileNamePrefix + file.getName(),
                            fileNamePrefix + completableFutureThumbnail.get().getName(), true);
                    break;
                case ".png":
                    completableFutureThumbnail = imageResolutionService.convertResolutionPng(file, newWidth, newHeight);
                    resourceEntity = new Resource(file.getName(), fileNamePrefix + file.getName(),
                            fileNamePrefix + completableFutureThumbnail.get().getName(), true);
                    break;
                case ".gif":
                    completableFutureMid = imageResolutionService.makeThumbnailFromGif(file);
                    completableFutureThumbnail = imageResolutionService.convertResolutionPng(completableFutureMid.get(), newWidth, newHeight);
                    resourceEntity = new Resource(file.getName(), fileNamePrefix + file.getName(),
                            fileNamePrefix + completableFutureThumbnail.get().getName(), true);
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
            if (completableFutureThumbnail != null) {
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
                try {
                    completableFutureThumbnail.get().delete();
                } catch (InterruptedException e) {
                    throw new RuntimeException(e);
                } catch (ExecutionException e) {
                    throw new RuntimeException(e);
                }
            }
            if (mid != null) {
                mid.delete();
            }
        }
        return resourceEntity;
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
