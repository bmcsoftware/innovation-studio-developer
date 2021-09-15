package com.example.rest.ticket;


import com.fasterxml.jackson.annotation.JsonProperty;


public class Note {
    @JsonProperty
    private String RECORDTYPE = "NOTE";
    @JsonProperty
    private String title = "";

    public void setTitle(String title) {
        this.title = title;
    }
}
