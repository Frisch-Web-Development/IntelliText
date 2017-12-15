package com.intellitext.htmlgenerator;

import java.util.ArrayList;

import org.apache.commons.lang3.StringUtils;

import com.intellitext.model.FileEntity;
import com.intellitext.model.FolderEntity;

public class HtmlGenerator {

	String html;
	ArrayList<FolderEntity> folders;
	ArrayList<FileEntity> files;
	
	ArrayList<HtmlFolder> htmlFolders;
	ArrayList<HtmlFile> htmlFiles;
	
	public HtmlGenerator(String html, ArrayList<FolderEntity> folders, ArrayList<FileEntity> files) {
		super();
		this.html = html;
		this.folders = folders;
		this.files = files;
	}

	
	
	public void normalize() {
		for(FolderEntity folder : folders) {
			htmlFolders.add(new HtmlFolder(folder.getName(), folder.getPath(), StringUtils.countMatches(folder.getPath(), "/") - 1, HtmlObjectType.FOLDER, folder.getColor(), new ArrayList<HtmlFolder>(), new ArrayList<HtmlFile>()));
		}
		for(FileEntity file : files) {
			htmlFiles.add(new HtmlFile(file.getName(), file.getUserPath(),  StringUtils.countMatches(file.getUserPath(), "/"), HtmlObjectType.FILE));
		}
	}
	
	public void sort() {
		/* do the sorty thingy here (i cant think right now)*/
	}
	

	public String generateHtml() {
		
		/*
		 * 1: Check type of object
		 * 2: If File, add to list
		 * 3: If it is a Folder, add to list, get array of contents, repeat with that array 
		 */
		
	
		
		//"<li><a class='toggle' id = '" + folders[i].path + "' href='javascript:void(0);'>"+folders[i].name+"<i class='fa fa-question-circle pull-right plus'>&#43;</i></a><div class='row inner' id = '" + folders[i].name  +"'></div>"
		return "test";
	}
	
	
	public String getHtml() {
		normalize();
		sort();
		return generateHtml();
	}
	
	
	
	
}
