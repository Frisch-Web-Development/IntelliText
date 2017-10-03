package com.intellitext;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

//import org.apache.catalina.authenticator.Constants;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.core.context.SecurityContextHolder;
//import org.springframework.security.core.*;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.support.RequestContext;
import org.springframework.webflow.context.ExternalContext;
import org.springframework.webflow.execution.RequestContextHolder;

import java.security.Principal;
import java.util.Collection;
import java.util.Locale; 
//import javax.faces.context.ExternalContext;

import com.dataapi.dao.PersistorDao;
import com.dataapi.dao.PersistorDaoImpl;
import com.dataapi.dao.RetrieverDao;
import com.dataapi.dao.RetrieverDaoImpl;
import com.dataapi.dao.UserEntity;
import com.intellitext.json.JsonTrans;


@Controller
public class MainController  {
	
	@Autowired
	RetrieverDao retriever;
	@Autowired
	PersistorDao persistor;

	@GetMapping("/")
	public String redirect(Model model) {
		return "redirect:/home";
	}

	@GetMapping("/login")
	public String getLogin(Model model, Principal principal) {
		System.out.println(principal == null);
		return "login";
	}
	
	@GetMapping("/home")
	public String getHome(Model model) {
		 SecurityContext context = SecurityContextHolder.getContext();
	      Authentication authentication = context.getAuthentication();
	      System.out.println( context ) ;
	      System.out.println( authentication ) ;
		return "home";
	}
	
	@RequestMapping(value = "/login/finish", method = RequestMethod.POST)
	public ResponseEntity<String> loginHandeler(@RequestBody String data) {
		System.out.println(data);
		String name = JsonTrans.cleanup(JsonTrans.getArrayValue(0, data));
		String email = JsonTrans.cleanup(JsonTrans.getArrayValue(1, data));

		System.out.println(email);
		System.out.println(name);
		UserEntity user = new UserEntity(name,email); 
		
		ExternalContext externalContext=RequestContextHolder.getRequestContext().getExternalContext();
		System.out.println(externalContext == null);
		UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(email,name,  AuthorityUtils.createAuthorityList("ROLE_USER")); 
		HttpServletRequest a = (HttpServletRequest) externalContext.getNativeRequest();
		token.setDetails(new WebAuthenticationDetails(a));
		Authentication auth = (Authentication)(token);  
		SecurityContextHolder.getContext().setAuthentication(auth);
		System.out.println(SecurityContextHolder.getContext().getAuthentication());
		
		if (!retriever.userExists(name)) {
			System.out.println("User Exists");

		} else {
			persistor.insertNewUser(user, "Users");
		}
		return new ResponseEntity<String>("All good", HttpStatus.OK);
	}

	

}