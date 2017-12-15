package com.intellitext.htmlgenerator;

public class HtmlObject {

	String name;
	String path;
	HtmlObjectType type;

	public HtmlObject(String name, String path, HtmlObjectType type) {
		super();
		this.name = name;
		this.path = path;
		this.type = type;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public HtmlObjectType getType() {
		return type;
	}

	public void setType(HtmlObjectType type) {
		this.type = type;
	}

}
