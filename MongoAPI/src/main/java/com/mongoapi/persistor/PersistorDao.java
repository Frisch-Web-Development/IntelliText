package com.mongoapi.persistor;

import com.main.entity.LoginEntity;
import com.main.entity.LoginEntityImpl;

public interface PersistorDao {

	void insertNewUser(LoginEntity login, String collection);	
	
}
