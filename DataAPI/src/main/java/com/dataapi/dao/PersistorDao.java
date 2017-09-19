package com.dataapi.dao;

public interface PersistorDao {

	void insertGeneric(Object object, String collection);

	void insertNewUser(UserEntity user, String collection);

	void insertNewFile(FileEntity file, UserEntity user);

	void updateFile(FileEntity file, UserEntity user);

	void deleteFile(FileEntity file, UserEntity user);	
	
}
