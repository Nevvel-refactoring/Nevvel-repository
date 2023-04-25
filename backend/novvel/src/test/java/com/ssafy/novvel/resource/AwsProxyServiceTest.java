package com.ssafy.novvel.resource;

import com.ssafy.novvel.resource.service.AwsProxyService;
import com.ssafy.novvel.resource.service.AwsProxyServiceImpl;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import java.io.File;
import java.io.IOException;
import java.time.LocalDate;



public class AwsProxyServiceTest {
    private AwsProxyService awsProxyService;

    @Test
//    @Disabled
    @DisplayName("file upload test")
    void uploadFileTest() throws IOException {
        File file = new File("src/test/resources/test.gif");

        awsProxyService = new AwsProxyServiceImpl();

        String fileNamePrefix = "files/" + LocalDate.of(2023,4,19) + "UUID" + "-";
        String saveFile = awsProxyService.uploadFile(file, fileNamePrefix + file.getName());
        File result = new File(saveFile);
        result.delete();

    }
}
