package com.intellitext.model;

import com.fasterxml.jackson.annotation.JsonView;
import com.intellitext.controller.JsonViews;

public class FolderEntity {

	@JsonView(value = { JsonViews.Folder.class })
	String name;
	@JsonView(value = { JsonViews.File.class })
	String color;
	@JsonView(value = { JsonViews.File.class })
	String path;
	@JsonView(value = { JsonViews.File.class })
	String owner;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public String getOwner() {
		return owner;
	}
	public void setOwner(String owner) {
		this.owner = owner;
	}
	
}
