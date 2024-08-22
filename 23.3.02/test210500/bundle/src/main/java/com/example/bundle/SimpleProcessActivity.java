package com.example.bundle;

import com.bmc.arsys.rx.services.action.domain.Action;
import com.bmc.arsys.rx.services.action.domain.ActionParameter;
import com.bmc.arsys.rx.services.common.Service;
import com.bmc.arsys.rx.services.common.domain.Scope;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

/**
 * This class creates a Service (Activity) which can be used in a Process or a Rule.
 * The class implements BMC Service.
 */
public class SimpleProcessActivity implements Service {
    /**
     * This action takes a String as an Input Parameter and returns an object.
     *
     * @param userName (String) the user name. The parameter must not be empty.
     * @return a simpleResponsePayload object with the username and the new password.
     */
    @Action(name = "generatePassword", scope = Scope.PUBLIC)
    public SimpleResponsePayload generatePassword(@ActionParameter(name = "userName") @NotBlank @NotNull String userName) {
        SimpleResponsePayload simpleResponsePayload = new SimpleResponsePayload();

        simpleResponsePayload.setUserName(userName);
        simpleResponsePayload.setPassword(userName + " fooBar");

        return simpleResponsePayload;
    }
}
