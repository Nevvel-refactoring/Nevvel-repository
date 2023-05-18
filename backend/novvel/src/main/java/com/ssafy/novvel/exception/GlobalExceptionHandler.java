package com.ssafy.novvel.exception;

import com.ssafy.novvel.exception.exceptiondto.ExceptionDto;

import javax.naming.AuthenticationException;
import javax.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.support.MissingServletRequestPartException;

import java.io.IOException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(NullPointerException.class)
    public ResponseEntity<ExceptionDto> handleNullPointerException(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<>(new ExceptionDto("정보를 찾을 수 없습니다.", e.getMessage()), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(NotSupportFormatException.class)
    public ResponseEntity<ExceptionDto> notSupportFormatException(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<>(new ExceptionDto("해당 포맷을 지원하지 않습니다.", e.getMessage()), HttpStatus.BAD_REQUEST);
    }


    @ExceptionHandler(IOException.class)
    public ResponseEntity<ExceptionDto> iOException(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<>(new ExceptionDto("입출력에 문제가 생겼습니다.", e.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<ExceptionDto> entityNotFoundException(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<>(new ExceptionDto("관련 정보를 찾을 수 없습니다.", e.getMessage()), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NotYourAuthorizationException.class)
    public ResponseEntity<ExceptionDto> notYourAuthorizationException(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<>(new ExceptionDto("권한이 없습니다.", e.getMessage()), HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(AuthenticationException.class)
    public ResponseEntity<?> authenticationException(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<>(new ExceptionDto("권한이 없습니다.", e.getMessage()), HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(BadRequestException.class)
    public ResponseEntity<?> badRequestException(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<>(new ExceptionDto("잘못된 요청입니다.", e.getMessage()), HttpStatus.BAD_REQUEST);
    }
    @ExceptionHandler(NeedImageException.class)
    public ResponseEntity<ExceptionDto> needImageException(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<>(new ExceptionDto("이미지가 필요합니다.", e.getMessage()), HttpStatus.FORBIDDEN);
    }

    @ExceptionHandler(MissingServletRequestPartException.class)
    public ResponseEntity<ExceptionDto> missingServletRequestPartException(Exception e) {
        e.printStackTrace();
        return new ResponseEntity<>(new ExceptionDto("업로드할 파일을 확인해주세요.", e.getMessage()), HttpStatus.FORBIDDEN);
    }

}
