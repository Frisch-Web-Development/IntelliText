package com.dataapi.dao;

import java.util.List;

public interface RetrieverDao {

	UserEntity getUserByName(String name);

	boolean userExists(String name);

	FileEntity getFile(FileEntity file, UserEntity user);

	List<FileEntity> getAllFiles(UserEntity user);

}
