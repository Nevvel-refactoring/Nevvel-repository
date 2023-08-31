package com.ssafy.novvel.util.aop;


import lombok.extern.log4j.Log4j2;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.stereotype.Component;

@Component
@Aspect
@Log4j2
public class TimeTrace {
    @Around("@annotation(TimeTracer)")
    public Object logTime(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {

        Long start = System.currentTimeMillis();
        log.info("start: {}, {}", start, proceedingJoinPoint.toString());

        try {
            return proceedingJoinPoint.proceed();
        } finally {

            log.info("end: {}, {}", System.currentTimeMillis() - start, proceedingJoinPoint.toString());
        }
    }
}
