package com.intellitext;

import java.security.Principal;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.dataapi.dao.UserEntity;
import com.fasterxml.jackson.annotation.JsonView;
import com.intellitext.config.JsonViews;

@RestController
public class MainRestController {

	//TODO Move the redirection logic to Javascript and put logic of returning objects and login into this class.

	@RequestMapping(value = "/user", method = RequestMethod.GET)
	public Principal user(Principal user) { 
		return user; 
	}
	
	@RequestMapping(value = "/user", method = RequestMethod.POST)
	@JsonView(JsonViews.UserEntity.class)
	public ResponseEntity login(@RequestBody UserEntity user) {
		System.out.println(user.getEmail()); 
		return null;
	}
	
}