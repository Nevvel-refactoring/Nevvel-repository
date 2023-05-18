package com.ssafy.novvel;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
//@EnableAsync
@EnableJpaAuditing
@SpringBootApplication
public class NovvelApplication {

    public static void main(String[] args) {
        SpringApplication.run(NovvelApplication.class, args);
    }

}
