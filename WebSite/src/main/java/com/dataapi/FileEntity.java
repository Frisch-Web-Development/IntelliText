package com.dataapi;

import java.util.ArrayList;
import java.util.Date;

public class FileEntity {

	// TODO add server path and user path and thumbnail
	
	String path;
	String name;
	String owner;
	String type;
	Date lastModified;
	Date dateCreated;
	ArrayList<String> sharedWith;

	public FileEntity(String path, String name, String owner, String type, Date lastModified, Date dateCreated,
			ArrayList<String> sharedWith) {
		super();
		this.path = path;
		this.name = name;
		this.owner = owner;
		this.type = type;
		this.lastModified = lastModified;
		this.dateCreated = dateCreated;
		this.sharedWith = sharedWith;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
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
