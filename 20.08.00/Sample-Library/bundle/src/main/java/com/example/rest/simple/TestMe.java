/*
Simple Class that will be returned during our tests.
 */

package com.example.rest.simple;

import com.fasterxml.jackson.annotation.JsonProperty;

public class TestMe {
    @JsonProperty
    private String userName = "";
    @JsonProperty
    private String password = "";

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
