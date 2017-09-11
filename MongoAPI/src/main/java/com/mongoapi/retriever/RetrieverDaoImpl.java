package com.mongoapi.retriever;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import com.main.entity.UserEntity;

public class RetrieverDaoImpl implements RetrieverDao{

	@Autowired
	MongoTemplate mongo;
	
	@Override
	public UserEntity getUserByName(String name) {
		return (UserEntity) mongo.findOne(new Query(Criteria.where("userName").is(name)), UserEntity.class);
	}
	
	@Override
	public boolean userExists(String name) {
		return (UserEntity) mongo.findOne(new Query(Criteria.where("userName").is(name)), UserEntity.class) == null;
	}
	
	
}
