package com.intellitext.controller;

import java.security.Principal;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
public class FileLoaderController {
	
	  @RequestMapping(value = "/file", method = RequestMethod.GET)
	  public String index(@RequestParam(value="param", required=false) String param) {
		  System.out.println(param);
		  String userName = param.substring(0, param.indexOf("/"));
		  System.out.println(userName);
		  String path = param.substring(param.indexOf("/") + 1, param.length());
		  System.out.println(path);
		  return "editorPage/myquill.html";
	  }
}