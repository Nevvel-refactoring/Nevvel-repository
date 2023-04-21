package com.ssafy.novvel.exception;

public class NotSupportFormatException extends RuntimeException{
    public NotSupportFormatException(){
        super("NotSupportFormatException");
    }
    public NotSupportFormatException(String msg){
        super(msg);
    }
}
