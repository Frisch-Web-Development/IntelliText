package com.mongoapi.retriever;

import com.main.entity.UserEntity;

public interface RetrieverDao {

	UserEntity getUserByName(String name);

	boolean userExists(String name);

}
