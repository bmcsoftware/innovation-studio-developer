package com.example.rest.ticket;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.ArrayList;
import java.util.List;

public class Ticket {
    @JsonProperty
    private String RECORDTYPE = "TICKET";
    @JsonProperty
    private List<Note> NoteList = new ArrayList<>();
    @JsonProperty
    private String Title = "";

    public void setNoteList(List<Note> noteList) {
        NoteList = noteList;
    }

    public void setTitle(String title) {
        Title = title;
    }
}
