/*
 * Simple Custom Java Command
 */

package com.example.command;

import java.net.URI;
import javax.ws.rs.core.UriInfo;
import org.springframework.transaction.annotation.Isolation;

import com.bmc.arsys.rx.services.common.Command;
import com.bmc.arsys.rx.services.common.annotation.AccessControlledMethod;
import com.bmc.arsys.rx.services.common.annotation.AccessControlledMethod.AuthorizationLevel;
import com.bmc.arsys.rx.services.common.annotation.AccessControlledMethod.LicensingLevel;
import com.bmc.arsys.rx.services.common.annotation.RxDefinitionTransactional;

// The class extends BMC object Command
// We must declare the class in "MyLibrary.java".
public class SimpleCommand extends Command{
	// Parameters
	private String username;				// input parameter
	private String password;		// input parameter

	// automatic getter (username)
    public String getUsername() {
        return username;
    }

    // automatic setter (username)
    // sent by postman for example (?).
    public void setUsername(String username) {
        this.username = username;
    }
    
	// automatic getter
    public String getPassword() {
        return password;
    }

    // automatic setter
    // sent by postman for example (?).
    public void setPassword(String password) {
        this.password = password;
    }

    // Code executed when command is called.
    // This example is very simple, usually a Command does an action and does not send back any result.
    @Override
    @RxDefinitionTransactional(readOnly = true, isolation = Isolation.DEFAULT, rollbackFor = Exception.class)
    @AccessControlledMethod(authorization = AuthorizationLevel.ValidUser, licensing = LicensingLevel.Application, checkSchemaForSpecialAccess = true, promoteStructAdmin = true)
    public URI execute(UriInfo arg0) {
        System.out.println("hello world :) username="+getUsername()+", password="+getPassword());

        return null;
    }
}