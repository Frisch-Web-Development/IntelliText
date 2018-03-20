package com.intellitext.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class FolderLoaderController {
	@RequestMapping(value = "/folder", method = RequestMethod.GET)
	public String index(@RequestParam(value = "path", required = false) String param) {
		if(param != null) {
			System.out.println(param);
			String userName = param.substring(0, param.indexOf("/"));
			System.out.println(userName);
			String path = param.substring(param.indexOf("/") + 1, param.length());
			System.out.println(path);
		}
		return "storage.html";
	}
}