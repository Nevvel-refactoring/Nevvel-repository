package com.ssafy.novvel.resource;

import com.ssafy.novvel.resource.service.AwsProxyService;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import java.io.File;
import java.io.IOException;
import java.time.LocalDate;

@SpringBootTest
public class AwsProxyServiceTest {
    @Autowired
    private AwsProxyService awsProxyService;

    @Test
//    @Disabled
    @DisplayName("file upload test")
    void uploadFileTest() throws IOException {
        File file = new File("src/test/resources/test.gif");
        String fileNamePrefix = "files/" + LocalDate.of(2023,4,19) + "UUID" + "-";
        String saveFile = awsProxyService.uploadFile(file, fileNamePrefix + file.getName());
        File result = new File(saveFile);
        result.delete();

    }
}
