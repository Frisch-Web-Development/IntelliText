package com.intellitext.model;

import com.fasterxml.jackson.annotation.JsonView;
import com.intellitext.controller.JsonViews;

public class User {
	
	@JsonView(value = { JsonViews.User.class })
	private String email;
	
	@JsonView(value = { JsonViews.User.class })
	private String firstName;
	
	@JsonView(value = { JsonViews.User.class })
	private String lastName;
	
	@JsonView(value = { JsonViews.User.class })
	private String socialId;

	@JsonView(value = { JsonViews.User.class })
	private String tokenId;
	
	private String password;
	
	private Role role;


	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getSocialId() {
		return socialId;
	}

	public void setSocialId(String socialId) {
		this.socialId = socialId;
	}

	public String getTokenId() {
		return tokenId;
	}

	public void setTokenId(String tokenId) {
		this.tokenId = tokenId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Role getRole() {
		return role;
	}

	public void setRole(Role role) {
		this.role = role;
	}
	
}