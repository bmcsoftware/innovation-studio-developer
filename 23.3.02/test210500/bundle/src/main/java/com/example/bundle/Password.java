package com.example.bundle;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Object used in different example when "generating" a
 * login and password object.
 */
public class Password {
    @JsonProperty
    private String userName;
    @JsonProperty
    private String password;

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
