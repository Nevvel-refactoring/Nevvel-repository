package com.ssafy.novvel.resource.service;

import com.ssafy.novvel.resource.entity.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

public interface ResourceService {
    Resource saveFile(MultipartFile multipartFile) throws IOException;
    Resource saveFile(File file) throws IOException;

//    File makeThumbnailFromGif(File file) throws IOException;
//    File convertToPng(File file) throws IOException;
//    File convertToJpg(File file) throws IOException;
//    File convertResolutionPng(File file, int width, int height) throws IOException;

}
