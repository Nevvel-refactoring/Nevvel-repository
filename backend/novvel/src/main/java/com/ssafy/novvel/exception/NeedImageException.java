package com.ssafy.novvel.exception;

public class NeedImageException extends RuntimeException {
    public NeedImageException() {
        super("UserNotFoundException");
    }

    public NeedImageException(String msg) {
        super(msg);

    }
}