package com.intellitext.htmlgenerator;

public class HtmlObject {

	String name;
	String path;
	int parents;
	HtmlObjectType type;

	public HtmlObject(String name, String path, int parents, HtmlObjectType type) {
		super();
		this.name = name;
		this.path = path;
		this.parents = parents;
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

	public int getParents() {
		return parents;
	}

	public void setParents(int parents) {
		this.parents = parents;
	}

	public HtmlObjectType getType() {
		return type;
	}

	public void setType(HtmlObjectType type) {
		this.type = type;
	}

}
