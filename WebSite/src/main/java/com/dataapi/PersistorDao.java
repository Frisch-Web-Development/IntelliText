package com.dataapi;

import com.model.User;

public interface PersistorDao {

	void insertGeneric(Object object, String collection);

	void insertNewUser(User user, String collection);

	void insertNewFile(FileEntity file, User user);

	void updateFile(FileEntity file, User user);

	void deleteFile(FileEntity file, User user);	
	
}
