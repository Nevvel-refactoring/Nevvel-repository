package com.ssafy.novvel.resource;

import com.ssafy.novvel.resource.service.S3Service;
import com.ssafy.novvel.resource.service.S3ProxyServiceImpl;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import java.io.File;
import java.io.IOException;
import java.time.LocalDate;



public class S3ProxyServiceTest {
    private S3Service s3Service;

    @Test
//    @Disabled
    @DisplayName("file upload test")
    void uploadFileTest() throws IOException {
        File file = new File("src/test/resources/test.gif");

        s3Service = new S3ProxyServiceImpl();

        String fileNamePrefix = "files/" + LocalDate.of(2023,4,19) + "UUID" + "-";
        String saveFile = s3Service.uploadFile(file, fileNamePrefix + file.getName());
        File result = new File(saveFile);
        result.delete();

    }
}
