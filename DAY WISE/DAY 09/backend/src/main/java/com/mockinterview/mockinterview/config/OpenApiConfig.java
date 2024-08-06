package com.mockinterview.mockinterview.config;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;

@Configuration
public class OpenApiConfig {
        @Bean
        public OpenAPI defineOpenApi() {
                Server server = new Server();
                server.setUrl("http://localhost:8080");
                server.setDescription("App Development");

                Info info = new Info()
                                .title("Mock Interview API")
                                .version("0.1")
                                .description("swagger configuration testing.");

                // Define JWT security scheme
                SecurityScheme securityScheme = new SecurityScheme()
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT");

                // Add the JWT security scheme to the components
                Components components = new Components().addSecuritySchemes("bearerAuth", securityScheme);

                // Add security requirement with JWT authentication
                SecurityRequirement securityRequirement = new SecurityRequirement().addList("bearerAuth");

                // Create the OpenAPI object with components and security requirements
                return new OpenAPI()
                                .info(info)
                                .servers(Arrays.asList(server))
                                .components(components)
                                .addSecurityItem(securityRequirement);
        }
}
