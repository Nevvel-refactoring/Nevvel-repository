package com.ssafy.novvel.file.service;

import java.io.File;
import java.io.IOException;

public interface AwsProxyService {

    String uploadFile(File file, String fileName) throws IOException;

    String findByUrl(String url);


}
