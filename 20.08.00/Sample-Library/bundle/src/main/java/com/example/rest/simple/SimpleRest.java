/*
 * Simple Custom Rest API
 */

package com.example.rest.simple;

import com.bmc.arsys.rx.services.common.RestfulResource;
import com.bmc.arsys.rx.services.common.annotation.AccessControlledMethod;
import com.bmc.arsys.rx.services.common.annotation.RxDefinitionTransactional;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * Main Class
 * REST root url:
 * http{s}://{server}:{port}/api/com.example.samplelibrary/hello
 */
@Path("hello")
public class SimpleRest implements RestfulResource {
    /**
     * @return TestMe    (JSON)      TestMe object in JSON format.
     * Url to call:
     * http{s}://{server}:{port}/api/com.example.samplelibrary/hello/world/{userName}
     * @summary Returns a TestMe object.
     * @statuscode 200 If the fetch is successfull.
     */
    @GET
    @Path("/world/{userName}")
    @RxDefinitionTransactional(readOnly = true)
    @AccessControlledMethod(authorization = AccessControlledMethod.AuthorizationLevel.ValidUser)
    @Produces(MediaType.APPLICATION_JSON)
    public TestMe generateReportEvents(@PathParam("userName") String userName) {
        TestMe myTest = new TestMe();

        myTest.setUserName(userName);
        myTest.setPassword(userName + ", password");

        return myTest;
    }
}