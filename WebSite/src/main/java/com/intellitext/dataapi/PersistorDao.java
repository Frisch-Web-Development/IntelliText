package com.intellitext.dataapi;

import java.security.Principal;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.intellitext.model.FileEntity;
import com.intellitext.model.FolderEntity;
import com.intellitext.model.User;

public interface PersistorDao extends UserDetailsService{

	void insertGeneric(Object object, String collection);

	void insertNewUser(User user, String collection);

	void insertNewFile(FileEntity file, Principal user);

	void deleteFile(FileEntity file, User user);
	
	void insertNewFolder(FolderEntity folder, Principal prince);
	
	void updateFile(String file,String filePath, Principal user);	
	
}
