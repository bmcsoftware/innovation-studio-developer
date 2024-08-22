package com.example.bundle;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * This will be the FruitRest rest Api Response.
 */
public class FruitResponse {
    @JsonProperty
    private String fruit;
    @JsonProperty
    private String configuration;

    public String getFruit() {
        return fruit;
    }

    public void setFruit(String fruit) {
        this.fruit = fruit;
    }

    public String getConfiguration() {
        return configuration;
    }

    public void setConfiguration(String configuration) {
        this.configuration = configuration;
    }
}
