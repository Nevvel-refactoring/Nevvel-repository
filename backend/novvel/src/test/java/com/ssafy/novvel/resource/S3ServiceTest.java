package com.ssafy.novvel.resource;

import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.PutObjectResult;
import com.ssafy.novvel.resource.service.S3Service;
import com.ssafy.novvel.resource.service.S3ServiceImpl;
import lombok.SneakyThrows;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.time.LocalDate;

@ExtendWith(SpringExtension.class)
public class S3ServiceTest {

    @Test
//    @Disabled
    @DisplayName("file upload logic test")
    void uploadFileLogicTest() throws IOException {
        File file = new File("src/test/resources/test.gif");

        S3Service s3ProxyService = new S3ServiceImpl(new AmamsonS3ClientImpl());

        String fileNamePrefix = "files/" + LocalDate.of(2023, 4, 19) + "UUID" + "-";
        String saveFile = s3ProxyService.uploadFile(file, fileNamePrefix + file.getName());

        Assertions.assertThat(saveFile).isEqualTo("http://test/files/id");
    }


    private class AmamsonS3ClientImpl extends AmazonS3Client {
        public AmamsonS3ClientImpl() {
        }

        @Override
        public PutObjectResult putObject(PutObjectRequest putObjectRequest) {
            return new PutObjectResult();
        }

        @SneakyThrows
        @Override
        public URL getUrl(String bucketName, String key) {
            return new URL("http", "test", "/files/id");
        }

        @Override
        public void deleteObject(DeleteObjectRequest deleteObjectRequest) throws SdkClientException {
        }
    }
}
