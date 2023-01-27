package com.example.bundle;

import com.bmc.arsys.rx.services.common.RestfulResource;
import com.bmc.arsys.rx.services.common.annotation.AccessControlledMethod;
import com.bmc.arsys.rx.services.common.annotation.RxDefinitionTransactional;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * Custom Rest Api used in the view component example "generate-password".
 *
 * REST root url:
 * http{s}://{server}:{port}/api/com.example.test210500/simplerestcall
 */
@Path("simplerestcall")
public class SimpleRest implements RestfulResource {
    /**
     * @return SimpleResponsePayload    (JSON)      SimpleResponsePayload object in JSON format.
     * Url to call:
     * http{s}://{server}:{port}/api/com.example.test210500/simplerestcall/generatepassword/{userName}
     * @summary Returns a SimpleResponsePayload object.
     * @statuscode 200 If the fetch is successful.
     */
    @GET
    @Path("/generatepassword/{userName}")
    @RxDefinitionTransactional(readOnly = true)
    @AccessControlledMethod(authorization = AccessControlledMethod.AuthorizationLevel.ValidUser)
    @Produces(MediaType.APPLICATION_JSON)
    public SimpleResponsePayload generateReportEvents(@PathParam("userName") String userName) {
        SimpleResponsePayload simpleResponsePayload = new SimpleResponsePayload();

        simpleResponsePayload.setUserName(userName);
        simpleResponsePayload.setPassword(userName + " fooBar");

        return simpleResponsePayload;
    }
}
