package com.dataapi.dao;

import com.dataapi.JsonViews;
import com.fasterxml.jackson.annotation.JsonView;

public class UserEntity {

	@JsonView(value = {JsonViews.UserEntity.class})
	String userName;
	@JsonView(value = {JsonViews.UserEntity.class})
	String email;

	public UserEntity(String userName, String email) {
		super();
		this.userName = userName;
		this.email = email;
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

}