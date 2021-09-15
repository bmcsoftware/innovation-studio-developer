/*
 * This class generates a Service (Activity) which can be used in a Process or a Rule.
 */
package com.example.service.simple;

import javax.validation.constraints.NotNull;

import org.hibernate.validator.constraints.NotBlank;

import com.bmc.arsys.rx.services.action.domain.Action;
import com.bmc.arsys.rx.services.action.domain.ActionParameter;
import com.bmc.arsys.rx.services.common.Service;
import com.example.rest.simple.TestMe;

/*
 * You need to create a class that implements the BMC Service.
 */
public class SimpleService implements Service {

    /**
     * This action takes a String as an Input Parameter and returns an object.
     *
     * @param userName (String) the user name. The parameter must not be empty.
     * @return a TestMe object with the username and the new password.
     */
    @Action(name = "generatePassword")
    public TestMe generatePassword(@ActionParameter(name = "userName") @NotBlank @NotNull String userName) {
        TestMe myTest = new TestMe();

        myTest.setUserName(userName);
        myTest.setPassword(userName + ",  password");

        return myTest;
    }
}
