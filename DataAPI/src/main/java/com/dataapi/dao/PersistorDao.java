package com.dataapi.dao;

public interface PersistorDao {

	void insertGeneric(Object object, String collection);

	void insertNewUser(UserEntity user, String collection);	
	
}
