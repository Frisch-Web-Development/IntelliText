package com.dataapi.dao;

public interface RetrieverDao {

	UserEntity getUserByName(String name);

	boolean userExists(String name);

}