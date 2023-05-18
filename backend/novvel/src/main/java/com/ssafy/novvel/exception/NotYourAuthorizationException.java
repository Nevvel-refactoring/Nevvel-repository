package com.ssafy.novvel.exception;

public class NotYourAuthorizationException extends RuntimeException{

    public NotYourAuthorizationException(){
        super("NotSupportFormatException");
    }
    public NotYourAuthorizationException(String msg){
        super(msg);
    }
}
