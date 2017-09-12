package com.dataapi.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.test.context.ContextConfiguration;

import com.mongodb.MongoClient;

@Repository
@Component
public class PersistorDaoImpl implements PersistorDao{

	@Autowired
	MongoTemplate mongo;
	
	@Override
	public void insertGeneric(Object object, String collection) {
		mongo.insert(object, collection);
	}
	
	
	@Override
	public void insertNewUser(LoginEntity login, String collection) {
		// TODO Auto-generated method stub
		mongo.insert(login, collection);
	}

	
}
