package com.main;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class MainController {

	@GetMapping("/")
	public String redirect(Model model) {
		return "redirect:/home";
	}

	@GetMapping("/login")
	public String postHome(Model model) {
		return "login";
	}

	@GetMapping("/home")
	public String getHome(Model model) {
		return "home";
	}

}