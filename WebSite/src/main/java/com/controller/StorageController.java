package com.controller;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.dataapi.FileEntity;
import com.dataapi.PersistorDao;
import com.dataapi.RetrieverDao;
import com.model.User;

@RestController
public class StorageController {
	
	
	@Autowired
	PersistorDao persistor;

	@Autowired
	RetrieverDao retriever;
	
	
	@RequestMapping(value = "/conf/storage", method = RequestMethod.GET)
	// "Retrieve list of all registered users"
	public List<FileEntity> getAllUserFiles(Principal prince) {
		return retriever.getAllFiles((User)prince); // Un Cast after fix of implementation
	}
	
	@RequestMapping(value = "/conf/storage/recent", method = RequestMethod.GET)
	// "Retrieve list of all registered users"
	public FileEntity[] getRecentFiles(Principal prince) {
		List<FileEntity> list =  retriever.getAllFiles((User)prince); // Un Cast after fix of implementation
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
		List<FileEntity> result = new List<FileEntity>(); 
		List<FileEntity> all = retriever.getAllFiles((User)prince);
		
		for(FileEntity file: all)
		{
			if(file.getLocalPath().equals(path)) // Method needs to be created
				result.add(file); 
		}
		return result; 
		
		
	}
	@RequestMapping(value = "/conf/storage/insetFile", method = RequestMethod.GET)
	public void insertFile(@RequestBody FileEntity file,Principal prince)
	{
		persistor.insertNewFile(file, (User)prince);
	}
	
	

}
