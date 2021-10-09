package com.example.bundle;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * This class represents the payload sent to the FruitRest rest api and
 * the custom datapage query.
 *
 * For the rest api it needs to match the properties passed by the UI in the action
 *  "fruit-picker" and passed as IFruitRestAttributes:
 *  src/main/webapp/libs/com-example-test210500/src/lib/actions/fruit-picker/fruit-picker-action.interface.ts
 */
public class Fruit {
    @JsonProperty
    private String fruit;
    @JsonProperty
    private String price;
    @JsonProperty
    private String displayId;
    @JsonProperty
    private String guid;
    @JsonProperty
    private FruitAttributes fruitAttributes;

    public String getFruit() {
        return fruit;
    }

    public void setFruit(String fruit) {
        this.fruit = fruit;
    }

    public FruitAttributes getFruitAttributes() {
        return fruitAttributes;
    }

    public void setFruitAttributes(FruitAttributes fruitAttributes) {
        this.fruitAttributes = fruitAttributes;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getDisplayId() {
        return displayId;
    }

    public void setDisplayId(String displayId) {
        this.displayId = displayId;
    }

    public String getGuid() {
        return guid;
    }

    public void setGuid(String guid) {
        this.guid = guid;
    }
}
