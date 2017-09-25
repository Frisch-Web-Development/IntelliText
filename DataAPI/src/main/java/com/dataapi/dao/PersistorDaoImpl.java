package com.dataapi.dao;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.test.context.ContextConfiguration;

import com.mongodb.MongoClient;

@Repository
@Component
public class PersistorDaoImpl implements PersistorDao {

	@Autowired
	MongoTemplate mongo;

	@Override
	public void insertGeneric(Object object, String collection) {
		mongo.insert(object, collection);
	}

	@Override
	public void insertNewUser(UserEntity user, String collection) {
		mongo.insert(user, collection);
	}

	@Override
	public void insertNewFile(FileEntity file, UserEntity user) {
		UserFileStorageEntity storage = mongo.findOne(
				new Query(Criteria.where("email").is(user.getEmail())
						.orOperator(Criteria.where("name").is(user.getUserName()))),
				UserFileStorageEntity.class, "Files");
		storage.addFile(file);
		//Update update = new Update();
	}
	
	@Override
	public void updateFile(FileEntity file, UserEntity user) {
		
	}
	
	@Override
	public void deleteFile(FileEntity file, UserEntity user) {
		
	}
	
	
}