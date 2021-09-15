/*
 * This Rest API show how to get the user information currently logged in.
 *
 * This is to specifically address a question on BMC Communities:
 * https://communities.bmc.com/thread/181717
 */

package com.example.rest.getUserInfos;

import com.bmc.arsys.rx.services.common.RestfulResource;
import com.bmc.arsys.rx.services.common.annotation.AccessControlledMethod;
import com.bmc.arsys.rx.services.common.annotation.RxDefinitionTransactional;
import com.bmc.arsys.rx.application.common.ServiceLocator;
import com.bmc.arsys.rx.services.user.UserService;
import com.bmc.arsys.rx.services.user.domain.User;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

/**
 * Main Class
 * REST root url:
 * http{s}://{server}:{port}/api/com.example.samplelibrary/restUserInfos
 */
@Path("restUserInfos")
public class RestGetUserInfos implements RestfulResource {
    /**
     * @return UserInfos    (JSON)      User Info object in JSON format.
     * Url to call:
     * http{s}://{server}:{port}/api/com.example.samplelibrary/restUserInfos/getMyInfos
     * @summary Returns a UserInfos object. This returns information of the currently logged in user.
     * @statuscode 200 If the fetch is successful.
     */
    @GET
    @Path("/getMyInfos")
    @RxDefinitionTransactional(readOnly = true)
    @AccessControlledMethod(authorization = AccessControlledMethod.AuthorizationLevel.ValidUser)
    @Produces(MediaType.APPLICATION_JSON)
    public UserInfos getUserInfos() {
        UserInfos myUserInfos = new UserInfos();

        // We get the current user context (actually the user Service)
        UserService userService = ServiceLocator.getUserService();
        // We ask for the information of the currently logged in user.
        // We do not have a getCurrentUser() method but we can use the keyword $USER$
        // which is the current user.
        User user = userService.getUser("$USER$");

        // Getting the user information and sending them back
        myUserInfos.setEmailAddress(user.getEmailAddress());
        myUserInfos.setFullName(user.getFullName());
        myUserInfos.setId(user.getId());
        myUserInfos.setLoginName(user.getLoginName());
        myUserInfos.setUserId(user.getUserId());

        return myUserInfos;
    }
}
