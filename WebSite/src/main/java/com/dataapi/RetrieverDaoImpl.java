package com.dataapi;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

import com.model.User;

@Repository
@Component
public class RetrieverDaoImpl implements RetrieverDao {

	@Autowired
	MongoTemplate mongo;

	@Override
	public User getUserByName(String name) {
		return (User) mongo.findOne(new Query(Criteria.where("userName").is(name)), User.class);
	}

	@Override
	public boolean userExists(String name) {
		return (User) mongo.findOne(new Query(Criteria.where("userName").is(name)), User.class) == null;
	}

	@Override
	public List<FileEntity> getAllFiles(User user) {
		UserFileStorageEntity storage = mongo.findOne(
				new Query(Criteria.where("email").is(user.getEmail())
						.orOperator(Criteria.where("name").is(user.getEmail()))),
				UserFileStorageEntity.class, "Files");
		return storage.getFiles();
	}

	@Override
	public FileEntity getFile(FileEntity file, User user) {
		UserFileStorageEntity storage = mongo.findOne(
				new Query(Criteria.where("email").is(user.getEmail())
						.orOperator(Criteria.where("name").is(user.getEmail()))),
				UserFileStorageEntity.class, "Files");
		return storage.getFile(file.getPath());
	}

	@Override
	public List<User> getAllUsers() {
		
		return mongo.findAll(User.class, "Users");
	}

}
