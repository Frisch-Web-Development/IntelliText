package com.intellitext.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import static org.springframework.http.HttpMethod.*;

@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter{

	    @Autowired
	    public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
	       // auth.userDetailsService(userDetailsService()).passwordEncoder(passwordEncoder());
	             auth.authenticationProvider(authenticationProvider());
	    }

	    public void configure(HttpSecurity http) throws Exception {
	        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.ALWAYS)
	                .and().csrf().disable().authorizeRequests()
	                .antMatchers(POST, "/conf/assignment").hasRole("ADMIN")
	                .antMatchers(PUT, "/conf/assignment").hasRole("ADMIN")
	                .antMatchers(DELETE, "/conf/assignment").hasRole("ADMIN")
	                .antMatchers(GET, "/conf/userlist").hasRole("ADMIN")
	                .antMatchers(POST, "/conf/submit").hasAnyRole("USER", "ADMIN")
	                .antMatchers(GET, "/conf/submit/assignment/**").hasRole("ADMIN")
	                .antMatchers(GET, "/add.html").hasRole("ADMIN")
	                .antMatchers(GET, "/grades_all.html").hasRole("ADMIN")
	                .antMatchers(GET, "/conf/user/submissions/**").hasRole("ADMIN")
	                .anyRequest().permitAll();
	    }


	    @Bean
	    public AuthenticationProvider authenticationProvider() {
	        DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
	        provider.setPasswordEncoder(passwordEncoder());
	        provider.setUserDetailsService(userDetailsService());
	        return provider;
	    }

	    @Bean
	    public PasswordEncoder passwordEncoder() {
	        return new BCryptPasswordEncoder();
	    }
	
	
}