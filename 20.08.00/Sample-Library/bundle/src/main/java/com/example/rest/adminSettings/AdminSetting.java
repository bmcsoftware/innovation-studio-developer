package com.example.rest.adminSettings;

import com.fasterxml.jackson.annotation.JsonProperty;

public class AdminSetting {
    @JsonProperty
    private String bundleId = "";
    @JsonProperty
    private String componentName = "";
    @JsonProperty
    private String settingName = "";
    @JsonProperty
    private String settingValue = "";
    @JsonProperty
    private String errorMessage = "";
    @JsonProperty
    private String errorLevel = "";

    public void setErrorLevel(String errorLevel) {
        this.errorLevel = errorLevel;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public void setBundleId(String bundleId) {
        this.bundleId = bundleId;
    }

    public void setComponentName(String componentName) {
        this.componentName = componentName;
    }

    public void setSettingName(String settingName) {
        this.settingName = settingName;
    }

    public void setSettingValue(String settingValue) {
        this.settingValue = settingValue;
    }
}
