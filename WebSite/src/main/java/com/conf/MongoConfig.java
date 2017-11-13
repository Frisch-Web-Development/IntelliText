package com.conf;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.authentication.UserCredentials;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.core.MongoClientFactoryBean;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.SimpleMongoDbFactory;

import com.mongodb.Mongo;
import com.mongodb.MongoClient;
import com.mongodb.MongoCredential;
import com.mongodb.ServerAddress;

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
	@Value("${db.port}")
	int port;
	
	 public @Bean MongoClientFactoryBean mongoDbFactory() throws Exception {
	        MongoClientFactoryBean clientFactoryBean = new MongoClientFactoryBean();
	        clientFactoryBean.setHost(host);
	        clientFactoryBean.setPort(port);
	        System.out.println("Creating MongoClientFactoryBean | Port: " + port + " | host: " + host);
	        MongoCredential credential = MongoCredential.createScramSha1Credential(userName, dbName, password.toCharArray());
	        clientFactoryBean.setCredentials(new MongoCredential[]{credential});
	        return clientFactoryBean;
	    }

	    public @Bean MongoTemplate mongoTemplate(Mongo mongo) throws Exception {
	        MongoTemplate mongoTemplate = new MongoTemplate(mongo, dbName);
	        System.out.println("Created MongoTemplateBean with " + mongo.toString());
	        return mongoTemplate;

	    }

}