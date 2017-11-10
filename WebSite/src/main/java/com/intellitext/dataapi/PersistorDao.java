package com.intellitext.dataapi;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.intellitext.model.User;

public interface PersistorDao extends UserDetailsService{

	void insertGeneric(Object object, String collection);

	void insertNewUser(User user, String collection);

	void insertNewFile(FileEntity file, User user);

	void updateFile(FileEntity file, User user);

	void deleteFile(FileEntity file, User user);	
	
}
