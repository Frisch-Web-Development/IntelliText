package com.dataapi;

import java.util.List;

import com.model.User;

public interface RetrieverDao {

	User getUserByName(String name);

	boolean userExists(String name);

	FileEntity getFile(FileEntity file, User user);

	List<FileEntity> getAllFiles(User user);

	List<User> getAllUsers();

}
