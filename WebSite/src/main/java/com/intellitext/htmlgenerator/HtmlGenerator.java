package com.intellitext.htmlgenerator;

import java.util.ArrayList;

import com.intellitext.model.FileEntity;
import com.intellitext.model.FolderEntity;

public class HtmlGenerator {

	String html;
	ArrayList<FolderEntity> folders;
	ArrayList<FileEntity> files;
	
	
	public HtmlGenerator(String html, ArrayList<FolderEntity> folders, ArrayList<FileEntity> files) {
		super();
		this.html = html;
		this.folders = folders;
		this.files = files;
	}


	public void generateHtml(ArrayList<FileEntity> files, ArrayList<FolderEntity> folders) {
		
		HtmlString html = new HtmlString();
		ArrayList<HtmlFolder> firstHtml = new ArrayList<HtmlFolder>();

		
		for(FolderEntity folder : folders) {
			if(StringUtils.countMatches(folder.getPath(), "/") == 1) {
				firstHtml.add(new HtmlFolder(null, null, folder.getName(), folder.getPath()));
			}
		}
		
		html.setHtml(firstHtml);
		
		boolean run = true;
		int count = 2;

		while(run) {
			run = false;
			
			for(FolderEntity folder : folders) {
				if(StringUtils.countMatches(folder.getPath(), "/") == count) {
					
					
					run = true;
				}
			}
			
		}
		
		
		
		
		
		"li><a class='toggle' id = '" + folders[i].path + "' href='javascript:void(0);'>"+folders[i].name+"<i class='fa fa-question-circle pull-right plus'>&#43;</i></a><div class='row inner' id = '" + folders[i].name  +"'></div>"
	}
	
	
	
}
