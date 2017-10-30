package com.controller;

import com.conf.GoogleProperties;
import com.dataapi.PersistorDao;
import com.dataapi.RetrieverDao;
import com.fasterxml.jackson.annotation.JsonView;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken.Payload;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.model.User;

import java.security.Principal;
import java.util.Collections;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.servlet.http.HttpSession;

@RestController
public class UserController {

	private static final JacksonFactory jacksonFactory = new JacksonFactory();

	@Autowired
	AuthenticationManager authenticationManager;

	@Autowired
	GoogleProperties googleProperties;

	@Autowired
	PersistorDao persistor;

	@Autowired
	RetrieverDao retriever;

	@RequestMapping(value = "/conf/userlist", method = RequestMethod.GET)
	// "Retrieve list of all registered users"
	public List<User> getAll() {
		return retriever.getAllUsers();
	}

	@RequestMapping(value = "/conf/user", method = RequestMethod.GET)
	// "Check user status"
	public Principal user(Principal user) {
		return user;
	}

	// "Authenticate the provided user": "User information obtained from Google"
	@RequestMapping(value = "/conf/user", method = RequestMethod.POST)
	public ResponseEntity login(@RequestBody User user) throws Exception {
		if (user == null || user.getEmail() == null) {
			return new ResponseEntity("Invalid data", HttpStatus.BAD_REQUEST);
		}
		GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(new NetHttpTransport(), jacksonFactory)
				.setAudience(Collections.singletonList(googleProperties.getClientId())).build();
		GoogleIdToken idToken = verifier.verify(user.getTokenId());
		if (idToken == null) {
			return new ResponseEntity("Invalid token data", HttpStatus.BAD_REQUEST);
		} else {
			Payload payload = idToken.getPayload();
			if (payload == null || !payload.getEmail().equals(user.getEmail())) {
				return new ResponseEntity("Invalid email address", HttpStatus.BAD_REQUEST);
			}
			// log.info("Verified account");
		}
		if (retriever.getUserByEmail(user.getEmail()) != null) {
			// System.out.println("Authenticating");

			UsernamePasswordAuthenticationToken authrequest = new UsernamePasswordAuthenticationToken(user.getEmail(),
					null, retriever.loadUserByUsername(user.getEmail()).getAuthorities());
			SecurityContextHolder.getContext().setAuthentication(authrequest);
			// System.out.println("Success for login controller");
			return new ResponseEntity("Finished, authenticated", HttpStatus.OK);
		} else {
			try {
				persistor.insertNewUser(user, "Users");
			} catch (Exception e) {
				e.printStackTrace();
				return new ResponseEntity("Invalid email address", HttpStatus.BAD_REQUEST);
			}

			Set<GrantedAuthority> grant = new HashSet<GrantedAuthority>();
			grant.add(new SimpleGrantedAuthority(user.getRole().toString()));
			UsernamePasswordAuthenticationToken authrequest = new UsernamePasswordAuthenticationToken(user.getEmail(),
					null, grant);
			SecurityContextHolder.getContext().setAuthentication(authrequest);
			return new ResponseEntity("Created, authenticated", HttpStatus.OK);
		}

	}

	@RequestMapping(value = "/conf/user", method = RequestMethod.DELETE)
	public void logout(HttpSession session) {
		session.invalidate();
	}

	@RequestMapping(value = "/conf/user/test", method = RequestMethod.GET)
	public ResponseEntity test(Authentication authentication) {
		// System.out.println(SecurityContextHolder.getContext().getAuthentication().isAuthenticated());
		if (SecurityContextHolder.getContext().getAuthentication().isAuthenticated()) {
			// log.info(SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString());
		}

		return new ResponseEntity("Ok", HttpStatus.OK);
	}

}
