/*
 * Custom Java Command
 */

package com.example.command;

import java.net.URI;
import javax.ws.rs.core.HttpHeaders;
import javax.ws.rs.core.Response;
import javax.ws.rs.core.UriInfo;
import org.springframework.transaction.annotation.Isolation;

import com.bmc.arsys.rx.services.common.Command;
import com.bmc.arsys.rx.services.common.annotation.AccessControlledMethod;
import com.bmc.arsys.rx.services.common.annotation.AccessControlledMethod.AuthorizationLevel;
import com.bmc.arsys.rx.services.common.annotation.AccessControlledMethod.LicensingLevel;
import com.bmc.arsys.rx.services.common.annotation.RxDefinitionTransactional;

// The class extends BMC object Command
// We must declare the class in "MyLibrary.java".
public class TestCommand extends Command{
	// Parameters
	private String inputId;				// input parameter
	private String inputUserName;		// input parameter
	private String outputCommandAnswer;	// used for output
	
	// Setting the answer (output).
	private void setOutputCommandAnswer(String myAnswer){
		this.outputCommandAnswer=myAnswer;
		return;
	}
	
	// Getting the answer (output)
	private String getOutputCommandAnswer(){
		return outputCommandAnswer;
	}

	// automatic getter (input)
    public String getInputId() {
        return inputId;
    }

    // automatic setter (input)
    // sent by postman for example (?).
    public void setInputId(String recordID) {
        this.inputId = recordID;
    }
    
	// automatic getter
    public String getInputUserName() {
        return inputUserName;
    }

    // automatic setter
    // sent by postman for example (?).
    public void setInputUserName(String myUserName) {
        this.inputUserName = myUserName;
    }

    // Code executed when command is called.
    // This example is very simple, it will just send back the parameters, as string.
    @Override
    @RxDefinitionTransactional(readOnly = true, isolation = Isolation.DEFAULT, rollbackFor = Exception.class)
    @AccessControlledMethod(authorization = AuthorizationLevel.ValidUser, licensing = LicensingLevel.Application, checkSchemaForSpecialAccess = true, promoteStructAdmin = true)
    public URI execute(UriInfo arg0) {
    	// Saving the Answer (String that will be returned to the UI).
    	setOutputCommandAnswer("hello world :) id="+getInputId()+", userName="+getInputUserName());

        return null;
    }
    
    // This function will build the response sent to output parameter.
    @Override
    public Response buildResponse(URI uri, HttpHeaders httpHeaders) {
    	// We can store the answer in "Response.ok" (as String for example).
    	// It will be automatically returned when the "execute" is executed.
    	Response response = Response.ok(getOutputCommandAnswer()).build();
    	
        return response;
    }
}