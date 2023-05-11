package com.ssafy.novvel.exception;

public class BadRequestException extends RuntimeException{

    public BadRequestException(){
        super("BadRequestException");
    }
    public BadRequestException(String msg){
        super(msg);
    }
}
