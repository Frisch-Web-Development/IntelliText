package com.intellitext.htmlgenerator;

import java.util.ArrayList;

public class HtmlFolder extends HtmlObject{



	public HtmlFolder(String name, String path, HtmlObjectType type, String color, ArrayList<HtmlFolder> folders,
			ArrayList<HtmlFile> files) {
		super(name, path, type);
		this.color = color;
		this.folders = folders;
		this.files = files;
	}
	
	String color;
	ArrayList<HtmlFolder> folders;
	ArrayList<HtmlFile> files;
	
	
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
