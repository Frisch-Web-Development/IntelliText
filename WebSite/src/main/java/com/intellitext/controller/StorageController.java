package com.intellitext.controller;

import java.security.Principal;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.intellitext.dataapi.PersistorDao;
import com.intellitext.dataapi.RetrieverDao;
import com.intellitext.model.FileEntity;
import com.intellitext.model.User;


@RestController
public class StorageController {
	
	
	@Autowired
	PersistorDao persistor;

	@Autowired
	RetrieverDao retriever;
	
	
	@RequestMapping(value = "/conf/storage", method = RequestMethod.GET)
	// "Retrieve list of all registered users"
	public List<FileEntity> getAllUserFiles(Principal prince) {
		return retriever.getAllFiles(prince); // unCast after fix of implementation
	}
	
	@RequestMapping(value = "/conf/storage/recent", method = RequestMethod.GET)
	// "Retrieve list of all registered users"
	public FileEntity[] getRecentFiles(Principal prince) {
		List<FileEntity> list =  retriever.getAllFiles(prince); // Un Cast after fix of implementation
		FileEntity result[] = new FileEntity[4]; //change length for amount
		
		for(FileEntity file: list)
		{
			for(int i = 0; i<result.length; i++)
			{
				if(result[i] == null || file.getLastModified().after(result[i].getLastModified()))
				{
					result[i] = file; 
				}
			}
		}
		return result; 	
	}
	@RequestMapping(value = "/conf/storage/localPath", method = RequestMethod.GET)
	public List<FileEntity> getFileInLocalPath (String path, Principal prince)
	{
		List<FileEntity> result = new ArrayList<FileEntity>(); 
		List<FileEntity> all = retriever.getAllFiles(prince);
		
		for(FileEntity file: all)
		{
			if(file.getUserPath().equals(path)) // Method needs to be created
				result.add(file); 
		}
		return result; 
		
		
	}
	
	@JsonView(value = { JsonViews.File.class })
	@RequestMapping(value = "/conf/storage/insert", method = RequestMethod.POST)
	public void insertFile(@RequestBody FileEntity file, Principal prince)
	{
		System.out.println("Inserting file");
		persistor.insertNewFile(file, prince);
	}
	
	

}
