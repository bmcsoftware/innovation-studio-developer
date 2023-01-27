package com.example.bundle;

import com.bmc.arsys.rx.services.common.Command;
import com.bmc.arsys.rx.services.common.annotation.AccessControlledMethod;
import com.bmc.arsys.rx.services.common.annotation.RxDefinitionTransactional;
import org.springframework.transaction.annotation.Isolation;

import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import java.net.URI;

/**
 * Custom Java Command.
 * It is usually used as a way to trigger an action server side
 * and usually does not return a result.
 *
 *  The command name is the package Name with the class name, so here:
 *  com.example.bundle.Test210500GeneratePasswordCommand
 *  The best practice is to use the bundle name to prefix the Command.
 *  So here Test210500.
 *  This is to avoid collisions.
 */
public class Test210500GeneratePasswordCommand extends Command {
    // Parameters (Input / Output).
    private String inputId;				// Input parameter.
    private String inputUserName;		// Input parameter.
    private Password outputCommandAnswer;	// Output parameter.

    // Setters and Getters.
    // Setting the answer (outputCommandAnswer).
    private void setOutputCommandAnswer(Password passwordObject){
        this.outputCommandAnswer=passwordObject;
    }

    // Getting the answer (outputCommandAnswer).
    private Password getOutputCommandAnswer(){
        return outputCommandAnswer;
    }

    // Automatic getter (inputId).
    public String getInputId() {
        return inputId;
    }

    // Automatic setter (inputId).
    // Sent by postman for example.
    public void setInputId(String inputId) {
        this.inputId = inputId;
    }

    // Automatic getter (inputUserName).
    public String getInputUserName() {
        return inputUserName;
    }

    // Automatic setter (inputUserName).
    // Sent by postman for example.
    public void setInputUserName(String inputUserName) {
        this.inputUserName = inputUserName;
    }

    // Code executed when the command is called.
    // This example is very simple, it will just send back the parameters, as a Json object.
    @Override
    @RxDefinitionTransactional(readOnly = true, isolation = Isolation.DEFAULT)
    @AccessControlledMethod(authorization = AccessControlledMethod.AuthorizationLevel.ValidUser)
    public URI execute(UriInfo arg0) {
        Password password = new Password();

        // Preparing the Output and storing it.
        password.setUserName(getInputUserName());
        password.setPassword("P4ssw0rd!");
        setOutputCommandAnswer(password);

        return null;
    }

    // This function will build the response sent to output parameter.
    // By default a Command does not return any result.
    // Here we are overriding the usual functionality to return a Json object
    // by overriding buildResponse.
    @Override
    public Response buildResponse(URI uri, HttpHeaders httpHeaders) {
        // We can store the answer in "Response.ok" (as String or a Json object for example).
        // It will be automatically returned when the "execute" is executed.
        // Here we return the Password object as Json.
        Response response = Response.ok().entity(getOutputCommandAnswer()).header(CONTENT_TYPE, CONTENT_TYPE_APPLICATION_JSON).build();

        return response;
    }
}
