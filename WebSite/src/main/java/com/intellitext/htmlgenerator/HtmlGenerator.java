package com.intellitext.htmlgenerator;

import java.io.PrintStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;
import java.util.regex.Pattern;

import javax.swing.tree.TreeNode;

import org.apache.commons.lang3.StringUtils;

import com.intellitext.model.FileEntity;
import com.intellitext.model.FolderEntity;

public class HtmlGenerator {

	String html;
	ArrayList<FolderEntity> folders;
	ArrayList<FileEntity> files;

	ArrayList<HtmlFolder> htmlFolders;
	ArrayList<HtmlFile> htmlFiles;
	ArrayList<HtmlObject> htmlObjects;

	TreeMap tree = new TreeMap<HtmlFolder, HtmlObject>();
	
	
	public HtmlGenerator(String html, List<FolderEntity> list, List<FileEntity> list2) {
		super();
		this.html = html;
		this.folders = (ArrayList<FolderEntity>) list;
		this.files = (ArrayList<FileEntity>) list2;
	}

	public void normalize() {

		int idCounter = 0;

		htmlFolders = new ArrayList<HtmlFolder>();
		htmlFiles = new ArrayList<HtmlFile>();
		htmlObjects = new ArrayList<HtmlObject>();

		for (FolderEntity folder : folders) {

			htmlFolders.add(new HtmlFolder(folder.getName(), folder.getPath(),
					StringUtils.countMatches(folder.getPath(), "/") - 1, HtmlObjectType.FOLDER, idCounter,
					new TreeMap<HtmlFolder, HtmlObject>(), folder.getColor(), new ArrayList<HtmlFolder>(), new ArrayList<HtmlFile>()));
		}
		for (FileEntity file : files) {
			htmlFiles.add(new HtmlFile(file.getName(), file.getPath(),
					StringUtils.countMatches(file.getPath(), "/"), HtmlObjectType.FILE, idCounter, new TreeMap<HtmlFolder, HtmlObject>()));
		}
		htmlObjects.addAll(htmlFolders);
		htmlObjects.addAll(htmlFiles);

	}
		
	public void sort() {	
		int highestParent = 0;
		for(HtmlObject o : htmlObjects) {
			if(o.getParents() >= highestParent) {
				highestParent = o.getParents();
			}
		}
		
		for(int i = 0; i <= highestParent; i++) {
			for(HtmlObject o : htmlObjects) {
				
			}
		}
		
		
		ArrayList<String> parents = new ArrayList<String>();
		
		for(HtmlObject o : htmlObjects) {
			if(o.getParents() == 0) {
			}
		}
		
		
		
	}

	
	
	public String generateHtml() {

		/*
		 * 1: Check type of object 2: If File, add to list 3: If it is a Folder, add to
		 * list, get array of contents, repeat with that array
		 */

		// "<li><a class='toggle' id = '" + folders[i].path + "'
		// href='javascript:void(0);'>"+folders[i].name+"<i class='fa fa-question-circle
		// pull-right plus'>&#43;</i></a><div class='row inner' id = '" +
		// folders[i].name +"'></div>"

		String finalString = "";
		
		
		
		
		
		return "test";
	}

	public String getHtml() {
		normalize();
		sort();
		return generateHtml();
	}

}
