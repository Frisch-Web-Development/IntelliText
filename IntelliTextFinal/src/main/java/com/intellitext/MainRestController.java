package com.intellitext;

import java.security.Principal;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class MainRestController {


	@RequestMapping(value = "/getUser", method = RequestMethod.GET)
	public Principal user(Principal user) { 
		return user; 
	}
	
	//TODO Move the redirection logic to Javascript and put logic of returning objects and login into this class.
	
	
}