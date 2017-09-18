package com.dataapi.dao;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.authentication.UserCredentials;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoDbFactory;

import com.mongodb.Mongo;
import com.mongodb.MongoClient;
import com.mongodb.MongoCredential;

@Configuration
public class MongoConfig {

	@Value("${db.host}")
	String host;
	@Value("${db.dbname}")
	String dbName;
	@Value("${db.username}")
	String userName;
	@Value("${db.password}")
	String password;

	@Bean
	public MongoTemplate mongoTemplate() {
		System.out.println("Mongo Configured");
		UserCredentials credential = new UserCredentials(userName, password);
		MongoTemplate mongoTemplate = new MongoTemplate(new MongoClient(host), dbName, credential);
		return mongoTemplate;
	}

}