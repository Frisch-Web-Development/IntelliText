package com.main;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import JSON.JSONtrans;

@Controller
public class MainController {

	@GetMapping("/")
	public String redirect(Model model) {
		return "redirect:/home";
	}

	@GetMapping("/login")
	public String getLogin(Model model) {
		return "login";
	}

	@GetMapping("/home")
	public String getHome(Model model) {
		return "home";
	}

	
	
	
	@RequestMapping(value = "/login/finish", method = RequestMethod.POST)
	public ResponseEntity<String> loginHandeler(@RequestBody String data ) {
		System.out.println(data); 
		//logic
		String name = JSONtrans.cleanup(JSONtrans.getArrayValue(0,data)); 
		String email = JSONtrans.cleanup(JSONtrans.getArrayValue(1, data)); 
		System.out.println(email);
		System.out.println(name); 
		if(mongoAPI.doesUserExit())
		{
			// Go to users storage page`	
		}
		else
		{
			mongoAPI.insertUser(name,email); 
		}
		return new ResponseEntity<String>("All good", HttpStatus.OK);
	}

}