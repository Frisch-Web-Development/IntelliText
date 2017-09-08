package com.mongoapi.config;

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
		Mongo mongo = new MongoClient(host);
		//MongoCredential credentials;
		MongoDbFactory mongoFactory = new SimpleMongoDbFactory(mongo, dbName);
		MongoTemplate mongoTemplate = new MongoTemplate(mongoFactory);
		return mongoTemplate;
	}
		
}