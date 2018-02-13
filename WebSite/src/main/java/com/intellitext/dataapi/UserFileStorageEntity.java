package com.intellitext.dataapi;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonView;
import com.intellitext.controller.JsonViews;
import com.intellitext.model.FileEntity;
import com.intellitext.model.FolderEntity;

public class UserFileStorageEntity {
	@JsonView(value = { JsonViews.UserFileStorageEntity.class })
	String userName;
	@JsonView(value = { JsonViews.UserFileStorageEntity.class })
	String email;
	@JsonView(value = { JsonViews.UserFileStorageEntity.class })
	List<FileEntity> files;
	@JsonView(value = { JsonViews.UserFileStorageEntity.class })
	List<FolderEntity> folders;

	public UserFileStorageEntity(String userName, String email, List<FileEntity> files, List<FolderEntity> folders) {
		super();
		this.userName = userName;
		this.email = email;
		this.files = files;
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

	public List<FileEntity> getFiles() {
		return files;
	}

	public void setFiles(List<FileEntity> files) {
		this.files = files;
	}

	public FileEntity getFile(String path) {
		for (FileEntity file : files) {
			if (file.getStoragePath().equals(path)) {
				return file;
			}
		}
		return null;
	}

	public List<FolderEntity> getFolders() {
		return folders;
	}

	public void setFolders(List<FolderEntity> folders) {
		this.folders = folders;
	}

	public void addFile(FileEntity file) {
		System.out.println(file + "Kill yourlsef you fucking bitch ");
		files.add(file);
	}
	
	public String toString()
	{
		return "User name: " + userName + " email: " + email + " Files" + files + " Folders " + folders;
		
	}

}
