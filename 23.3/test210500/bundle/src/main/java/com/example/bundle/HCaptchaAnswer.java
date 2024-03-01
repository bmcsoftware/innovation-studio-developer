package com.example.bundle;

import java.util.List;

/**
 * Object used in the CheckHCaptchaToken class.
 */
public class HCaptchaAnswer {
    private boolean status;
    private String errorMessage;
    private Boolean success;
    private String challenge_ts;
    private String hostname;
    private List<String> errorCodes;
    private String objectAsString;

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public String getErrorMessage() {
        return errorMessage;
    }

    public void setErrorMessage(String errorMessage) {
        this.errorMessage = errorMessage;
    }

    public Boolean getSuccess() {
        return success;
    }

    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public String getChallenge_ts() {
        return challenge_ts;
    }

    public void setChallenge_ts(String challenge_ts) {
        this.challenge_ts = challenge_ts;
    }

    public String getHostname() {
        return hostname;
    }

    public void setHostname(String hostname) {
        this.hostname = hostname;
    }

    public List<String> getErrorCodes() {
        return errorCodes;
    }

    public void setErrorCodes(List<String> errorCodes) {
        this.errorCodes = errorCodes;
    }

    public String getObjectAsString() {
        return objectAsString;
    }

    public void setObjectAsString(String objectAsString) {
        this.objectAsString = objectAsString;
    }

    @Override
    public String toString() {
        return "HCaptchaAnswer{" +
                "status=" + status +
                ", errorMessage='" + errorMessage + '\'' +
                ", success=" + success +
                ", challenge_ts='" + challenge_ts + '\'' +
                ", hostname='" + hostname + '\'' +
                ", errorCodes=" + errorCodes +
                '}';
    }
}
