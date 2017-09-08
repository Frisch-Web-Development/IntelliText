package com.mongoapi.main;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.mongodb.core.MongoTemplate;

@SpringBootApplication
public class MongoApiApplication {
	public static void main(String[] args) {
		SpringApplication.run(MongoApiApplication.class, args);
	}
}
