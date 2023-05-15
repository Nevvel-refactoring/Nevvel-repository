package com.ssafy.novvel.resource.service;

import com.ssafy.novvel.resource.entity.Resource;

import java.io.File;
import java.io.IOException;

public interface S3Service {

    String uploadFile(File file, String fileName) throws IOException;

    String findByUrl(String url);

    void deleteFile(Resource resource);


}
