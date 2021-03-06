package com.dataapi.dao;

import java.util.List;

public class UserFileStorageEntity {

	String userName;
	String email;
	List<FileEntity> files;

	public UserFileStorageEntity(String userName, String email, List<FileEntity> files) {
		super();
		this.userName = userName;
		this.email = email;
		this.files = files;
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
			if (file.getPath().equals(path)) {
				return file;
			}
		}
		return null;
	}

	public void addFile(FileEntity file) {
		files.add(file);
	}

}
