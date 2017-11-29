package com.intellitext.dataapi;

import java.util.List;

import com.intellitext.model.FolderEntity;

public class UserFolderStorageEntity {

	String userName;
	String email;
	List<FolderEntity> folders;

	public UserFolderStorageEntity(String userName, String email, List<FolderEntity> folders) {
		super();
		this.userName = userName;
		this.email = email;
		this.folders = folders;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public List<FolderEntity> getFolders() {
		return folders;
	}

	public void setFolders(List<FolderEntity> folders) {
		this.folders = folders;
	}

}