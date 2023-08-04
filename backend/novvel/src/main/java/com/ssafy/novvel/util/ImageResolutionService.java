package com.ssafy.novvel.util;

import java.io.File;
import java.io.IOException;
import java.util.concurrent.CompletableFuture;

public interface ImageResolutionService {
    CompletableFuture<File> makeThumbnailFromGif(File file) throws IOException;
    CompletableFuture<File> convertToPng(File file) throws IOException;
    CompletableFuture<File> convertToJpg(File file) throws IOException;
    CompletableFuture<File> convertResolutionPng(File file, Integer inputWidth, Integer inputHeight) throws IOException;
}
