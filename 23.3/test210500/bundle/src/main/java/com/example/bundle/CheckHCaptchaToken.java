package com.example.bundle;

import com.bmc.arsys.rx.services.action.domain.Action;
import com.bmc.arsys.rx.services.action.domain.ActionParameter;
import com.bmc.arsys.rx.services.common.Service;
import com.bmc.arsys.rx.services.common.domain.Scope;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import org.glassfish.jersey.client.ClientConfig;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.ws.rs.client.Client;
import javax.ws.rs.client.ClientBuilder;
import javax.ws.rs.client.Entity;
import javax.ws.rs.client.WebTarget;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;

/**
 * This Custom Activity can be used in a Process or a Rule.
 * Here we validate a hCatpcha token.
 * This is used for the Captcha example.
 *
 *  For reference:
 *  https://docs.hcaptcha.com/#verify-the-user-response-server-side
 *  Note:
 *  The secret key is not the siteKey but the key defined in the account settings:
 *  https://dashboard.hcaptcha.com/settings
 *  The hCaptcha apis extremely close to the Google reCaptcha ones (https://developers.google.com/recaptcha/docs/verify)
 *  as explained in hcaptcha's own documentation.
 *  The only difference with Google would be the verification url set in H_CAPTCHA_VERIFICATION_URL:
 *  https://www.google.com/recaptcha/api/siteverify
 */
public class CheckHCaptchaToken implements Service {
    StringWriter errors = new StringWriter();
    private static final String H_CAPTCHA_VERIFICATION_URL = "https://hcaptcha.com/siteverify";

    @Action(name = "verifyHCaptchaToken",
            scope = Scope.PUBLIC)
    public HCaptchaAnswer verifyHCaptchaToken(
            @ActionParameter(name = "hCaptchaSecretKey") @NotBlank @NotNull String hCaptchaSecretKey,
            @ActionParameter(name = "hCaptchaToken") @NotBlank @NotNull String hCaptchaToken
    ) {
        JsonNode jsonNode;
        Response response;
        HCaptchaAnswer hCaptchaAnswer = new HCaptchaAnswer();
        ObjectMapper objectMapper = new ObjectMapper();
        ClientConfig config = new ClientConfig();
        Client client = ClientBuilder.newClient(config);

        // Setting the answer.
        hCaptchaAnswer.setStatus(false);

        // Verifying the Captcha.
        WebTarget target = client.target(H_CAPTCHA_VERIFICATION_URL);

        try {
            response = target
                    .queryParam("secret", hCaptchaSecretKey)
                    .queryParam("response", hCaptchaToken)
                    .request(MediaType.APPLICATION_JSON)
                    .post(Entity.json(""));
        } catch (Exception e) {
            e.printStackTrace(new PrintWriter(errors));
            hCaptchaAnswer.setErrorMessage(errors.toString());

            return hCaptchaAnswer;
        }

        // Check request status.
        if (response.getStatus() != 200) {
            hCaptchaAnswer.setErrorMessage("Http error " + response.getStatus());

            return hCaptchaAnswer;
        }

        // Creating a Json Object.
        // https://www.baeldung.com/jackson-object-mapper-tutorial
        try {
            jsonNode = objectMapper.readTree(response.readEntity(String.class));
        } catch (IOException e) {
            e.printStackTrace(new PrintWriter(errors));
            hCaptchaAnswer.setErrorMessage(errors.toString());

            return hCaptchaAnswer;
        }

        hCaptchaAnswer.setSuccess(GetJsonValue(jsonNode, "success", "boolean"));
        hCaptchaAnswer.setChallenge_ts(GetJsonValue(jsonNode, "challenge_ts", "string"));
        hCaptchaAnswer.setHostname(GetJsonValue(jsonNode, "hostname", "string"));
        hCaptchaAnswer.setErrorCodes(GetJsonValue(jsonNode, "error-codes", "list"));
        // Values for Process Designer and IS UI.
        hCaptchaAnswer.setStatus(hCaptchaAnswer.getSuccess());
        hCaptchaAnswer.setErrorMessage(String.join(", ", hCaptchaAnswer.getErrorCodes() ));
        hCaptchaAnswer.setObjectAsString(hCaptchaAnswer.toString());

        return hCaptchaAnswer;
    }

    // Json utility method to check that we actually have an attribute
    // to read and cast it.
    @SuppressWarnings("unchecked")
    private <T> T GetJsonValue(JsonNode jsonNode, String key, String convertTo) {
        JsonNode test = jsonNode.get(key);

        switch (convertTo) {
            case "boolean":
                if (test == null) {
                    return (T) Boolean.FALSE;
                } else {
                    return (T) (Boolean)jsonNode.get(key).asBoolean();
                }
            case "list":
                ObjectMapper objectMapper = new ObjectMapper();
                List<String> list = new ArrayList<String>();

                ObjectReader reader = objectMapper.readerFor(new TypeReference<List<String>>() {
                });

                if (test == null) {
                    return (T) list;
                } else {
                    try {
                        list = reader.readValue(jsonNode.get("error-codes"));
                    } catch (IOException e) {
                        e.printStackTrace(new PrintWriter(errors));
                        list.add(errors.toString());
                    }

                    return (T) list;
                }
            case "string":
            default:
                if (test == null) {
                    return (T) "";
                } else {
                    return (T) jsonNode.get(key).asText();
                }
        }
    }
}
