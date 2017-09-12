package com.dataapi.dao;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoDbFactory;

import com.mongodb.Mongo;
import com.mongodb.MongoClient;

@Configuration
public class MongoConfig {

	String host;
	String dbName;	
	
	@Bean
	public MongoTemplate mongoTemplate() {
		System.out.println("Mongo Configured");
		MongoTemplate mongoTemplate = new MongoTemplate(new MongoClient("localhost:27017"),"IntelliText");
		return mongoTemplate;
	}
		
}