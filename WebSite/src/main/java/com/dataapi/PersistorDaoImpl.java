package com.dataapi;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Configurable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.test.context.ContextConfiguration;

import com.model.User;
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
	public void insertNewUser(User user, String collection) {
		mongo.insert(user, collection);
	}

	@Override
	public void insertNewFile(FileEntity file, User user) {
		UserFileStorageEntity storage = mongo.findOne(
				new Query(Criteria.where("email").is(user.getEmail())
						.orOperator(Criteria.where("name").is(user.getEmail()))), // TODO which ID to use?
				UserFileStorageEntity.class, "Files");
		storage.addFile(file);
	}
	
	@Override
	public void updateFile(FileEntity file, User user) {
		
	}
	
	@Override
	public void deleteFile(FileEntity file, User user) {
		//move file for 30 days
	}

	@Override
	public UserDetails loadUserByUsername(String arg0) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		return null;
	}
	
	
}