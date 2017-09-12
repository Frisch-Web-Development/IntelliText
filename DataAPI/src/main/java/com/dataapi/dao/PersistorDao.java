package com.dataapi.dao;

public interface PersistorDao {

	void insertNewUser(LoginEntity login, String collection);

	void insertGeneric(Object object, String collection);	
	
}
