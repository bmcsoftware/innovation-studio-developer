package com.example.bundle;

import com.fasterxml.jackson.annotation.JsonProperty;

/**
 * Class used in the main Fruit class.
 */
public class FruitAttributes {
    @JsonProperty
    private String color;
    @JsonProperty
    private String isGrowingOnTrees;
    @JsonProperty
    private String length;
    @JsonProperty
    private String width;
    @JsonProperty
    private String vendor;
    @JsonProperty
    private String needsToBeCooked;
    @JsonProperty
    private String isForDessertOnly;

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getIsGrowingOnTrees() {
        return isGrowingOnTrees;
    }

    public void setIsGrowingOnTrees(String isGrowingOnTrees) {
        this.isGrowingOnTrees = isGrowingOnTrees;
    }

    public String getLength() {
        return length;
    }

    public void setLength(String length) {
        this.length = length;
    }

    public String getWidth() {
        return width;
    }

    public void setWidth(String width) {
        this.width = width;
    }

    public String getVendor() {
        return vendor;
    }

    public void setVendor(String vendor) {
        this.vendor = vendor;
    }

    public String getNeedsToBeCooked() {
        return needsToBeCooked;
    }

    public void setNeedsToBeCooked(String needsToBeCooked) {
        this.needsToBeCooked = needsToBeCooked;
    }

    public String getIsForDessertOnly() {
        return isForDessertOnly;
    }

    public void setIsForDessertOnly(String isForDessertOnly) {
        this.isForDessertOnly = isForDessertOnly;
    }

    @Override
    public String toString() {
        return "FruitAttributes{" +
                "color='" + color + '\'' +
                ", isGrowingOnTrees='" + isGrowingOnTrees + '\'' +
                ", length='" + length + '\'' +
                ", width='" + width + '\'' +
                ", vendor='" + vendor + '\'' +
                ", needsToBeCooked='" + needsToBeCooked + '\'' +
                ", isForDessertOnly='" + isForDessertOnly + '\'' +
                '}';
    }
}
