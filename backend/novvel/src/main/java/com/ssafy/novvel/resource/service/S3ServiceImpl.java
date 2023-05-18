package com.ssafy.novvel.resource.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.ssafy.novvel.resource.entity.Resource;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.io.File;

@Service
@RequiredArgsConstructor
public class S3ServiceImpl implements S3Service {

    private final AmazonS3Client amazonS3Client;
    @Value("${cloud.aws.s3.bucket}")
    public String bucket; // S3 버킷 이름

    @Override
    @Transactional
    public String uploadFile(File file, String fileName) {
        amazonS3Client.putObject(
                new PutObjectRequest(bucket, fileName, file).withCannedAcl(CannedAccessControlList.PublicRead));
        return amazonS3Client.getUrl(bucket, fileName).toString();
    }

    @Override
    public String findByUrl(String url) {
        return null;
    }

    @Override
    @Transactional
    public void deleteFile(Resource resource) {
        DeleteObjectRequest deleteObjectRequest = new DeleteObjectRequest(this.bucket, resource.getChangedName());
        amazonS3Client.deleteObject(deleteObjectRequest);
        if (resource.getThumbnailUrl() != null) {
            DeleteObjectRequest deleteThumbnailObjectRequest = new DeleteObjectRequest(this.bucket, resource.getThumbnailName());
            amazonS3Client.deleteObject(deleteThumbnailObjectRequest);
        }

    }
}
