package com.example.bundle;

import com.bmc.arsys.rx.application.common.ServiceLocator;
import com.bmc.arsys.rx.services.RxException;
import com.bmc.arsys.rx.services.common.RestfulResource;
import com.bmc.arsys.rx.services.common.annotation.AccessControlledMethod;
import com.bmc.arsys.rx.services.common.annotation.RxDefinitionTransactional;
import com.bmc.arsys.rx.services.record.RecordService;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;

/**
 * Custom Rest Api consumed by the UI in the example:
 * action fruit-picker.
 *
 * REST root url:
 * http{s}://{server}:{port}/api/com.example.test210500/fruit
 */
@Path("fruit")
public class FruitRest implements RestfulResource {
    /**
     * @param fruit Fruit object containing the fruit configuration.
     * @return FruitResponse    (JSON)      Fruit object in JSON format.
     * Url to call:
     * POST:
     * http{s}://{server}:{port}/api/com.example.test210500/fruit/generateconfiguration/
     *
     * @statuscode 201 If the POST is successful.
     */
    @POST
    @Path("/generateconfiguration/")
    @RxDefinitionTransactional(readOnly = true)
    @AccessControlledMethod(authorization = AccessControlledMethod.AuthorizationLevel.ValidUser)
    @Produces(MediaType.APPLICATION_JSON)
    public FruitResponse generateConfiguration(final Fruit fruit) {
        FruitResponse fruitResponse = new FruitResponse();

        fruitResponse.setFruit(fruit.getFruit());
        // In this example we just set in the fruit response all attributes stringified.
        fruitResponse.setConfiguration(fruit.getFruitAttributes().toString());

        return fruitResponse;
    }

    /**
     * This Rest Api will trigger an exception to show how to localize error messages.
     *
     * @return Empty String.
     * Url to call:
     * GET:
     * http{s}://{server}:{port}/api/com.example.test210500/fruit/triggerexception/
     *
     * @statuscode 200 If the GET is successful (but this will never happen).
     */
    @GET
    @Path("/triggerexception/")
    @RxDefinitionTransactional(readOnly = true)
    @AccessControlledMethod(authorization = AccessControlledMethod.AuthorizationLevel.ValidUser)
    @Produces(MediaType.APPLICATION_JSON)
    public String triggerException() {
        RecordService recordService = ServiceLocator.getRecordService();

        try {
            // We try to get an unknown record instance on an unknown record definition to trigger an exception.
            recordService.getRecordInstance("TOMATO", "TOMATO");
        }
        catch (RxException e) {
            // Throwing an exception on purpose to test error message localization.
            throw new FruitException(
                    FruitException.FruitMessage.IS_TOMATO_A_FRUIT,
                    "TOMATO",
                    e );
        }

        return "";
    }
}
