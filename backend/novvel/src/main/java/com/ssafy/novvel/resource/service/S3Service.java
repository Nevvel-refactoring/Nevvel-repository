package com.ssafy.novvel.resource.service;

import java.io.File;
import java.io.IOException;

public interface S3Service {

    String uploadFile(File file, String fileName) throws IOException;

    String findByUrl(String url);

    void deleteFile(String fileName);


}
