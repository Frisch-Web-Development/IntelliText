package com.intellitext.web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@SpringBootApplication
@EnableAutoConfiguration
@ComponentScan("com.intellitext")

public class WebSiteApplication {
	public static void main(String[] args) {
		SpringApplication.run(WebSiteApplication.class, args);
	}
}