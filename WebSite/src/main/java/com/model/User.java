package com.model;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonView;

import javax.persistence.*;

public class User {

    private Long id;

    private String email;

    private String firstName;

    private String lastName;

    private String socialId;

    private String password;

    private Role role;

    private String tokenId;

    public Long getId() {
        return id;
    }

    public void setId(Long newId) {
        id = newId;
    }

    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getPassword() {
        return password;
    }

    public Role getRole() {
        return role;
    }

    public String getEmail() {
        return email;
    }

    public String getSocialId() {
        return socialId;
    }

    public String getTokenId() { return tokenId; }

    public void setFirstName(String fn) {
        firstName = fn;
    }

    public void setLastName(String ln) {
        lastName = ln;
    }

    public void setPassword(String pw) {
        password = pw;
    }

    public void setSocialId(String si) {
        socialId = si;
    }

    public void setEmail(String em) {
        email = em;
    }

    public void setRole(Role r) {
        role = r;
    }

    public void setTokenId(String t) { tokenId = t; }

}
