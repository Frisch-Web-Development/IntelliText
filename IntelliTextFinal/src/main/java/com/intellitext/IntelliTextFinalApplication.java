package com.intellitext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;
import org.springframework.data.mongodb.core.MongoTemplate;

import com.dataapi.dao.MongoConfig;
import com.dataapi.dao.PersistorDao;
import com.intellitext.config.WebSecurityConfig;

@SpringBootApplication
@ComponentScan("com.intellitext")
@EnableAutoConfiguration
@Import({WebSecurityConfig.class})
public class IntelliTextFinalApplication {

	public static void main(String[] args) {
		SpringApplication.run(IntelliTextFinalApplication.class, args);
	}
}
