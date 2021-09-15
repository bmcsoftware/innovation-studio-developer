package com.example.bundle;

import com.bmc.arsys.rx.services.common.RxBundle;
//import com.bmc.arsys.rx.services.common.domain.WebResourceDefinition;
import com.example.command.TestCommand;
import com.example.command.SimpleCommand;
import com.example.rest.getUserInfos.RestGetUserInfos;
import com.example.rest.ticket.RestTicket;
import com.example.rest.triggerActivity.RestTriggerActivity;
import com.example.rest.simple.SimpleRest;
import com.example.rest.adminSettings.RestAdminSettings;
import com.example.service.simple.AttachFile;
import com.example.service.simple.ListUtils;
import com.example.service.simple.SimpleService;
import com.example.datapage.DvdDataPageQuery;

/**
 * Rx Web Activator class.
 */
public class MyApplication extends RxBundle {

    /* (non-Javadoc)
     * @see com.bmc.arsys.rx.business.common.RxBundle#register()
     */
    @Override
    protected void register() {
        //
        // TODO: Register static web resources and framework extensions.
        //
        // registerService(new MyService());
        //
		
		// Registering Command classes
    	registerClass(TestCommand.class);
    	registerClass(SimpleCommand.class);

    	// Custom datapagequery
    	registerClass(DvdDataPageQuery.class);

        // Registering Custom REST calls.
        registerRestfulResource(new RestTicket());
        registerRestfulResource(new SimpleRest());
        registerRestfulResource(new RestGetUserInfos());
        registerRestfulResource(new RestTriggerActivity());
        registerRestfulResource(new RestAdminSettings());

        // Registering Services.
        registerService(new SimpleService());
        registerService(new AttachFile());
        registerService(new ListUtils());

        registerStaticWebResource(String.format("/%s", getId()), "/webapp");
    }
}
