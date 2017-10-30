package com.dataapi;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.social.security.SocialUser;

import com.model.Role;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

public class CodeUserDetails extends User {

    private Long id;

    private String username;

    private String firstname, lastname;

    private String password;

    private Role role;

    public CodeUserDetails(String username, String password, Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);
    }

    public Long getId() {
        return id;
    }

    public void setId(Long x) {
        id = x;
    }

    public Role getRole() {
        return role;
    }

    public static Builder getBuilder() {
        return new Builder();
    }

    public static class Builder {

        private Long id;

        private String username;

        private String firstName;

        private String lastName;

        private String password;

        private Role role;

        private Set<GrantedAuthority> authorities;

        public Builder() {
            this.authorities = new HashSet<GrantedAuthority>();
        }

        public Builder firstName(String firstName) {
            this.firstName = firstName;
            return this;
        }

        public Builder id(Long id) {
            this.id = id;
            return this;
        }

        public Builder lastName(String lastName) {
            this.lastName = lastName;
            return this;
        }

        public Builder password(String password) {
            if (password == null) {
                password = "SocialUser";
            }
            this.password = password;
            return this;
        }

        public Builder role(Role role) {
            this.role = role;

            SimpleGrantedAuthority authority = new SimpleGrantedAuthority(role.toString());
            this.authorities.add(authority);

            return this;
        }


        public Builder username(String username) {
            this.username = username;
            return this;
        }

        public CodeUserDetails build() {
            CodeUserDetails user = new CodeUserDetails(username, password, authorities);

            user.id = id;
            user.firstname = firstName;
            user.lastname = lastName;
            user.username = username;
            user.role = role;
            return user;
        }
    }

}


