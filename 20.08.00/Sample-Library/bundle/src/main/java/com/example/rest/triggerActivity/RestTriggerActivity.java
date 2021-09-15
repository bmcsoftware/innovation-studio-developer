/**
 * This rest api shows how to trigger a process activity directly rather than launching a process.
 * For example you could trigger a "connector" activity and get the result in your Java code.
 * Here we are going to call the custom activity coded earlier "generatePassword"
 * (\Sample-Library-Public\bundle\src\main\java\com\example\service\SimpleService.java) and get
 * the result in the Java code.
 * But you could use a connector activity, create record etc...
 *
 * Another potential pro of this method is that you could return a Map<String, Object> in your code.
 */

package com.example.rest.triggerActivity;

import com.bmc.arsys.rx.application.common.ServiceLocator;
import com.bmc.arsys.rx.services.action.ActionService;
import com.bmc.arsys.rx.services.action.domain.SimpleExecutionContext;
import com.bmc.arsys.rx.services.common.RestfulResource;
import com.bmc.arsys.rx.services.common.annotation.AccessControlledMethod;
import com.bmc.arsys.rx.services.common.annotation.RxDefinitionTransactional;
import com.bmc.arsys.rx.services.common.domain.ExecutionContext;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.HashMap;
import java.util.Map;

/**
 * This class is a Custom REST API that will:
 * Call a Connector Activity from Java Code,
 * Return the Activity Output,
 * The root URL is:
 * http://{host}:{port}/api/com.example.samplelibrary/triggerActivity
 */
@Path("triggerActivity")
public class RestTriggerActivity implements RestfulResource {

    /**
     * Calling an Activity from Java code.
     * This example calls the a custom activity we created earlier (generatePassword).
     * URL:
     * http://{host}:{port}/api/com.example.samplelibrary/triggerActivity/callGeneratePassword/{userName}
     *
     * @param userName userName that will be used to generate a password.
     * @return List of Objects returned by the activity (Map<String, Object>).
     */
    @GET
    @Path("/callGeneratePassword/{userName}")
    @RxDefinitionTransactional(readOnly = true)
    @AccessControlledMethod(authorization = AccessControlledMethod.AuthorizationLevel.Guest, promoteStructAdmin = true)
    @Produces(MediaType.APPLICATION_JSON)
    public Map<String, Object> callGeneratePassword(
            @PathParam("userName") String userName) {
        // Activity results
        Map<String, Object> results = null;

        // Getting Action Service object
        ActionService actionService = ServiceLocator.getActionService();

        // Mapping input parameters
        Map<String, Object> generatePasswordActivityInputMap = new HashMap<String, Object>();
        // You can see the mapping in the Process JSON of the connector activity.
        // For example here we can see we have one parameter named "userName", which expects one value.
        /*
        "inputMap": [
            {
                "assignTarget": "userName",
                "expression": "${processContext.Record Instance.User Name}"
            }
          ]
        */
        generatePasswordActivityInputMap.put("userName", userName);

        // Generating Execution Context based on the Activity Input Map
        ExecutionContext executionContext = new SimpleExecutionContext(generatePasswordActivityInputMap);

        // Calling the Activity
        // You must give the full activity name, fully qualified, you can look in a process JSON to look for the name (actionTypeName):
        // Here it would be "connector"
        // {
        //      "resourceType": "com.bmc.arsys.rx.services.process.domain.ServiceTaskDefinition",
        //      "actionTypeName": "connector",
        // In our case:
        // "actionTypeName": "com.example.samplelibrary:generatePassword",
        results = actionService.execute(executionContext, "com.example.samplelibrary:generatePassword");

        // The output is an activity object, here under the form of:
        // {"output":{"password":"test, password","userName":"test"}}

        return results;
    }
}
