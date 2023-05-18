package com.ssafy.novvel.config.swagger;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI(@Value("${springdoc.version}") String springdocVersion) {
        Info info = new Info()
                .title("D106 - Nevvel")
                .version(springdocVersion)
                .description("SSAFY 자율 프로젝트 D106팀의 Nevvel API 입니다.");

        return new OpenAPI()
                .info(info);
    }
}