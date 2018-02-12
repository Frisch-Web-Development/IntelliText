package com.intellitext.controller;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
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
	public ResponseEntity<String> getBlob( @PathVariable String filePath, @PathVariable String username, Principal prince)
	{
		String contents = ""; 
		if(prince.getName().equals(username))
		{
			contents = retriever.getFileContentsByPath(filePath, prince);
			return new ResponseEntity<String>(contents, HttpStatus.OK);
		}
		else 
		{
			System.out.println("hacker");
			return new ResponseEntity<String>("Error User not Authenticated", HttpStatus.CONFLICT);
		}
		
	}
	
	
	@RequestMapping(value = "/getfile", method = RequestMethod.GET)
	public @ResponseBody String returnBlob(
	            @RequestParam("path") String path) {
	        String response = "{"+"\"insert\"" + ":" + " \"Shut up\"" + "}";
	        
	        return response;
	    }
	
	
	@RequestMapping(value = "/file/save/{username}/{filePath}", method = RequestMethod.GET)
	public void saveBlob( @RequestBody String file, @PathVariable String filePath, @PathVariable String username, Principal prince)
	{
		if(prince.getName().equals(username))
		{
			persistor.updateFile(file, filePath,prince); 
		}
		else 
		{
			System.out.println("hacker");
		}
	}
}

