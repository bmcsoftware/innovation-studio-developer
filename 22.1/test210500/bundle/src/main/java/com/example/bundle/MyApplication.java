package com.example.bundle;

import com.bmc.arsys.rx.services.common.RxBundle;

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

        // Registering custom commands.
        registerClass(Test210500GeneratePasswordCommand.class);

        // Registering custom datapage queries.
        registerClass(Test210500FruitDataPageQuery.class);

        // Registering custom rest apis.
        registerRestfulResource(new SimpleRest());
        registerRestfulResource(new FruitRest());

        // Registering custom process activities.
        registerService(new SimpleProcessActivity());
        registerService(new CheckHCaptchaToken());
        registerService(new TwilioTextMessage());
        registerService(new ListUtils());
        registerService(new AttachFile());
        registerService(new AccessRecordInstances());

        registerStaticWebResource(String.format("/%s", getId()), "/webapp");
    }
}
