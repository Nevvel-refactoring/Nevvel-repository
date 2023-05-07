package com.ssafy.novvel.exception;

import com.ssafy.novvel.exception.exceptiondto.ExceptionDto;
import java.util.NoSuchElementException;
import javax.naming.AuthenticationException;
import javax.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.io.IOException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<ExceptionDto> handleNullPointerException(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<>(new ExceptionDto("정보를 찾을 수 없습니다.", e.getMessage()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(NotSupportFormatException.class)
    public ResponseEntity<?> notSupportFormatException(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<>(new ExceptionDto("해당 포맷을 지원하지 않습니다.", e.getMessage()), HttpStatus.NOT_ACCEPTABLE);
    }


    @ExceptionHandler(IOException.class)
    public ResponseEntity<?> iOException(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<>(new ExceptionDto("입출력에 문제가 생겼습니다.", e.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<?> entityNotFoundException(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<>(new ExceptionDto("관련 정보를 찾을 수 없습니다.", e.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<?> authenticationException(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<>(new ExceptionDto("권한이 없습니다.", e.getMessage()), HttpStatus.FORBIDDEN);
    }
}
