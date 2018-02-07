package com.intellitext.htmlgenerator;

import java.util.TreeMap;

public class HtmlObject {

	String name;
	String path;
	int parents;
	HtmlObjectType type;
	int uniqueID = 0;
	TreeMap<HtmlFolder, HtmlObject> tree;
	
	public HtmlObject(String name, String path, int parents, HtmlObjectType type, int uniqueID,
			TreeMap<HtmlFolder, HtmlObject> tree) {
		super();
		this.name = name;
		this.path = path;
		this.parents = parents;
		this.type = type;
		this.uniqueID = uniqueID;
		this.tree = tree;
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

	public int getUniqueID() {
		return uniqueID;
	}

	public void setUniqueID(int uniqueID) {
		this.uniqueID = uniqueID;
	}

	public TreeMap<HtmlFolder, HtmlObject> getTree() {
		return tree;
	}

	public void setTree(TreeMap<HtmlFolder, HtmlObject> tree) {
		this.tree = tree;
	}	
}
