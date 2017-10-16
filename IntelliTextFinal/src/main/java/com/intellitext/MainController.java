package com.intellitext;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
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
public class MainController {

	// TODO: Use this class for initial web site visits
	
	@Autowired
	RetrieverDao retriever;
	@Autowired
	PersistorDao persistor;

	@GetMapping("/")
	public String redirect(Model model) {
		return "redirect:/login";
	}

	@GetMapping("/login")
	public String getLogin(Model model) {
		return "login";
	}

	@GetMapping("/home")
	public String getHome(Model model) {
		return "home";
	}
}