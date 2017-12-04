package com.intellitext.dataapi;

import java.security.Principal;
import java.util.List;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.intellitext.model.FileEntity;
import com.intellitext.model.FolderEntity;
import com.intellitext.model.User;

public interface RetrieverDao extends UserDetailsService{

	User getUserByName(String name);

	boolean userExists(String name);

	FileEntity getFile(FileEntity file, Principal user);

	List<FileEntity> getAllFiles(Principal user);

	List<User> getAllUsers();

	User getUserByEmail(String email);

	List<FolderEntity> getAllFolders(Principal prince);

}
