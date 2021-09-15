/**
 * Dvd class
 */
package com.example.datapage;

import com.fasterxml.jackson.annotation.JsonProperty;

public class Dvd {
    @JsonProperty
    private String title = "";
    @JsonProperty
    private String price = "";

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setPrice(String price) {
        this.price = price;
    }
}
