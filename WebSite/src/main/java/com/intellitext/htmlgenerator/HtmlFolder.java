package com.intellitext.htmlgenerator;

import java.util.ArrayList;
import java.util.TreeMap;

public class HtmlFolder extends HtmlObject {

	String color;
	ArrayList<HtmlFolder> folders;
	ArrayList<HtmlFile> files;

	public HtmlFolder(String name, String path, int parents, HtmlObjectType type, int uniqueID,
			TreeMap<HtmlFolder, HtmlObject> tree, String color, ArrayList<HtmlFolder> folders,
			ArrayList<HtmlFile> files) {
		super(name, path, parents, type, uniqueID, tree);
		this.color = color;
		this.folders = folders;
		this.files = files;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public ArrayList<HtmlFolder> getFolders() {
		return folders;
	}

	public void setFolders(ArrayList<HtmlFolder> folders) {
		this.folders = folders;
	}

	public ArrayList<HtmlFile> getFiles() {
		return files;
	}

	public void setFiles(ArrayList<HtmlFile> files) {
		this.files = files;
	}

}
