package com.intellitext.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.intellitext.dataapi.PersistorDao;
import com.intellitext.dataapi.RetrieverDao;
import com.intellitext.model.FileEntity;

@RestController
public class EditorController {

	
	@Autowired
	PersistorDao persistor;

	@Autowired
	RetrieverDao retriever;
	
	@RequestMapping(value = "/file/{username}/{filePath}", method = RequestMethod.POST)
	public void getBlob( @RequestBody FileEntity file, @PathVariable String filePath, @PathVariable String username, Principal prince)
	{
		if(prince.getName().equals(username))
		{
			persistor.updateFile(file,prince); 
		}
		else 
		{
			System.out.println("hacker");
		}
	}
}

