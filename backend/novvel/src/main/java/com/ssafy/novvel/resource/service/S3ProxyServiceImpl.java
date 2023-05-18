package com.ssafy.novvel.resource.service;

import com.ssafy.novvel.resource.entity.Resource;
import lombok.extern.slf4j.Slf4j;

import java.io.*;

//@Service
@Slf4j
public class S3ProxyServiceImpl implements S3Service {

    @Override
    public String uploadFile(File sourceFile, String fileName) throws IOException {
        File targetFile = new File("src/main/resources/static/" + fileName);

        if(!targetFile.getParentFile().exists()){
            targetFile.getParentFile().mkdirs();
        }

        FileInputStream inputStream = new FileInputStream(sourceFile);
        FileOutputStream outputStream = new FileOutputStream(targetFile);

        byte[] buffer = new byte[1024];
        int length;
        while ((length = inputStream.read(buffer)) > 0) {
            outputStream.write(buffer, 0, length);
        }

        inputStream.close();
        outputStream.close();

        log.info("uploadFile: {}",targetFile.getPath());
        return targetFile.getPath();
    }

    @Override
    public String findByUrl(String url) {
        return null;
    }

    @Override
    public void deleteFile(Resource resource) {

    }
}
