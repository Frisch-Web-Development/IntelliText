package com.mongoapi.persistor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;

import com.main.entity.LoginEntity;

public class PersistorDaoImpl implements PersistorDao{

	@Autowired
	MongoTemplate mongo;
	
	@Override
	public void insertNewUser(LoginEntity login, String collection) {
		// TODO Auto-generated method stub
		mongo.insert(login, collection);
	}

}
