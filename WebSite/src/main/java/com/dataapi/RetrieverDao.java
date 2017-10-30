package com.dataapi;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.model.User;

public interface RetrieverDao extends UserDetailsService{

	User getUserByName(String name);

	boolean userExists(String name);

	FileEntity getFile(FileEntity file, User user);

	List<FileEntity> getAllFiles(User user);

	List<User> getAllUsers();

	User getUserByEmail(String email);

}
