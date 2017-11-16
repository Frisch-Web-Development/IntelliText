package com.intellitext.model;

import java.util.ArrayList;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonView;
import com.intellitext.controller.JsonViews;

public class FileEntity {

	@JsonView(value = { JsonViews.File.class })
	String userPath;
	@JsonView(value = { JsonViews.File.class })
	String storagePath;
	@JsonView(value = { JsonViews.File.class })
	String name;
	@JsonView(value = { JsonViews.File.class })
	String owner;
	@JsonView(value = { JsonViews.File.class })
	String type;
	@JsonView(value = { JsonViews.File.class })
	Date lastModified;
	@JsonView(value = { JsonViews.File.class })
	Date dateCreated;
	@JsonView(value = { JsonViews.File.class })
	ArrayList<String> sharedWith;

	public FileEntity(String userPath, String storagePath, String name, String owner, String type, Date lastModified,
			Date dateCreated, ArrayList<String> sharedWith) {
		super();
		this.userPath = userPath;
		this.storagePath = storagePath;
		this.name = name;
		this.owner = owner;
		this.type = type;
		this.lastModified = lastModified;
		this.dateCreated = dateCreated;
		this.sharedWith = sharedWith;
	}

	public FileEntity(String userPath, String name, String owner, String type, Date lastModified, Date dateCreated,
			ArrayList<String> sharedWith) {
		super();
		this.userPath = userPath;
		this.name = name;
		this.owner = owner;
		this.type = type;
		this.lastModified = lastModified;
		this.dateCreated = dateCreated;
		this.sharedWith = sharedWith;
	}

	public String getUserPath() {
		return userPath;
	}

	public void setUserPath(String userPath) {
		this.userPath = userPath;
	}

	public String getStoragePath() {
		return storagePath;
	}

	public void setStoragePath(String storagePath) {
		this.storagePath = storagePath;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getOwner() {
		return owner;
	}

	public void setOwner(String owner) {
		this.owner = owner;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public Date getLastModified() {
		return lastModified;
	}

	public void setLastModified(Date lastModified) {
		this.lastModified = lastModified;
	}

	public Date getDateCreated() {
		return dateCreated;
	}

	public void setDateCreated(Date dateCreated) {
		this.dateCreated = dateCreated;
	}

	public ArrayList<String> getSharedWith() {
		return sharedWith;
	}

	public void setSharedWith(ArrayList<String> sharedWith) {
		this.sharedWith = sharedWith;
	}

}
