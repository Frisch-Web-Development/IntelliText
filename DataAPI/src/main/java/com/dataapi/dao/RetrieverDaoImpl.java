package com.dataapi.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Repository;

@Repository
@Component
public class RetrieverDaoImpl implements RetrieverDao {

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

	@Override
	public List<FileEntity> getAllFiles(UserEntity user) {
		UserFileStorageEntity storage = mongo.findOne(
				new Query(Criteria.where("email").is(user.getEmail())
						.orOperator(Criteria.where("name").is(user.getUserName()))),
				UserFileStorageEntity.class, "Files");
		return storage.getFiles();
	}

	@Override
	public FileEntity getFile(FileEntity file, UserEntity user) {
		UserFileStorageEntity storage = mongo.findOne(
				new Query(Criteria.where("email").is(user.getEmail())
						.orOperator(Criteria.where("name").is(user.getUserName()))),
				UserFileStorageEntity.class, "Files");
		return storage.getFile(file.getPath());
	}

}
