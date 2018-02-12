
package com.intellitext.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.intellitext.dataapi.PersistorDao;
import com.intellitext.dataapi.RetrieverDao;
import com.intellitext.model.FileEntity;
import com.intellitext.model.FolderEntity;



@RestController
public class StorageController {

	@Autowired
	PersistorDao persistor;

	@Autowired
	RetrieverDao retriever;

	@RequestMapping(value = "/conf/storage", method = RequestMethod.GET)
	// "Retrieve list of all registered users"
	public List<FileEntity> getAllUserFiles(Principal prince) {
		if (prince == null) {
			System.out.println("PRINCE IS NULL");
		}
		return retriever.getAllFiles(prince); // unCast after fix of implementation
	}

	@RequestMapping(value = "/conf/storage/folders", method = RequestMethod.GET)
	// "Retrieve list of all registered users"
	public List<FolderEntity> getAllUserFolders(Principal prince) {
		if (prince == null) {
			System.out.println("PRINCE IS NULL");
		}
		return retriever.getAllFolders(prince); // unCast after fix of implementation
	}

	@RequestMapping(value = "/conf/storage/recent", method = RequestMethod.GET)
	// "Retrieve list of all registered users"
	public FileEntity[] getRecentFiles(Principal prince) {
		List<FileEntity> allFiles = retriever.getAllFiles(prince); // Un Cast after fix of implementation
		FileEntity result[] = new FileEntity[4]; // change length for amount
		try {
			for (FileEntity file : allFiles) {
				for (int i = 0; i < result.length; i++) {
					if (result[i] == null || file.getLastModified().after(result[i].getLastModified())) {
						result[i] = file;
					}
				}
			}
		} catch (Error e) {

		}
		return result;
	}

	@RequestMapping(value = "/conf/storage/localPath", method = RequestMethod.GET)
	public List<FileEntity> getFileInLocalPath(String path, Principal prince) {
		List<FileEntity> result = new ArrayList<FileEntity>();
		List<FileEntity> all = retriever.getAllFiles(prince);

		for (FileEntity file : all) {
			if (file.getPath().equals(path)) // Method needs to be created
				result.add(file);
		}
		return result;

	}

	@JsonView(value = { JsonViews.File.class })
	@RequestMapping(value = "/conf/storage/insert", method = RequestMethod.POST)
	public void insertFile(@RequestBody FileEntity file, Principal prince) {
		System.out.println("Inserting file");
		FileEntity tempFile = file;
		ArrayList<FileEntity> files = (ArrayList<FileEntity>) this.getAllUserFiles(prince);
		int counter = 0;
		for (FileEntity f : files) {
			if (f.getPath().equals(f.getPath())) {
				if (f.getName().contains(tempFile.getName() + " ") || f.getName().equals(tempFile.getName())) {
					counter += 1;
				}
			}
		}
		tempFile.setName(tempFile.getName() + " " + ((counter == 0) ? "" : counter));
		persistor.insertNewFile(file, prince);
	}

	@JsonView(value = { JsonViews.File.class })
	@RequestMapping(value = "/conf/storage/insertfolder", method = RequestMethod.POST)
	public void insertFolder(@RequestBody FolderEntity folder, Principal prince) {
		FolderEntity tempFolder = folder;
		System.out.println("Inserting folder");
		ArrayList<FolderEntity> folders = (ArrayList<FolderEntity>) this.getAllUserFolders(prince);
		int counter = 0;
		for (FolderEntity f : folders) {
			if (f.getPath().equals(tempFolder.getPath())) {
				if (f.getName().contains(tempFolder.getName() + " ") || f.getName().equals(tempFolder.getName())) {
					counter += 1;
				}
			}
		}
		tempFolder.setName(tempFolder.getName() + " " + ((counter == 0) ? "" : counter));
		persistor.insertNewFolder(tempFolder, prince);
	}
}