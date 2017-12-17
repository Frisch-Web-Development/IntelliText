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
			htmlFiles.add(new HtmlFile(file.getName(), file.getUserPath(),
					StringUtils.countMatches(file.getUserPath(), "/"), HtmlObjectType.FILE, idCounter, new TreeMap<HtmlFolder, HtmlObject>()));
		}
		htmlObjects.addAll(htmlFolders);
		htmlObjects.addAll(htmlFiles);

	}
		
	public void sort() {
		
		
		
		for(HtmlObject object : htmlObjects) {
			for(HtmlObject parent : htmlObjects) {
				if(parent.getParents() + 1 == object.getParents() && object.getPath().contains(parent.getPath())) {
					TreeMap<HtmlFolder, HtmlObject> temp = parent.getTree();
					temp.put(key, value)
				}
			}
		}
		
		
		
		
		/*
		for (HtmlObject object : htmlObjects) {
			if (object.getParents() == 0) {
				hierarchy.add(object);
				System.out.println("Adding " + object.getName() + " with parents " + object.getParents());
			}
		}

		int parentCounter = 0;
		boolean run = true;

		while (run) {
			parentCounter += 1;
			run = false;
			for (HtmlObject object : htmlObjects) {
				for (HtmlObject h : hierarchy) {
					if (object.getParents() != 0 && h.getParents() == parentCounter - 1
							&& h.getPath().contains(object.getPath())) {
						h.addObject(object);
						System.out.println("Adding " + object.getName() + " to " + h.getName() + " with parents "
								+ object.getParents());
						run = true;
					}
				}

			}
		}*/
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
