/**
 * This is a simple rest Api that returns Admin Settings set in your bundle.
 */
package com.example.rest.adminSettings;

import com.bmc.arsys.rx.application.common.ServiceLocator;
import com.bmc.arsys.rx.services.admin.domain.AdminHeader;
import com.bmc.arsys.rx.services.admin.domain.AdminSettingData;
import com.bmc.arsys.rx.services.admin.domain.AdminSettingDataContainer;
import com.bmc.arsys.rx.services.common.RestfulResource;
import com.bmc.arsys.rx.services.common.annotation.AccessControlledMethod;
import com.bmc.arsys.rx.services.common.annotation.RxDefinitionTransactional;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import java.util.Map;

/**
 * Main Class
 * REST root url:
 * http{s}://{server}:{port}/api/com.example.samplelibrary/getAdminSettings
 */
@Path("getAdminSettings")
public class RestAdminSettings implements RestfulResource {
    /**
     * @return Note    (JSON)      AdminSetting object in JSON format.
     * Url to call:
     * http{s}://{server}:{port}/api/com.example.samplelibrary/getAdminSettings/getSetting/{bundleId}/{componentName}/{settingName}
     * @summary Returns an AdminSetting object.
     * @statuscode 200 If the fetch is successful.
     */
    @GET
    @Path("/getSetting/{bundleId}/{componentName}/{settingName}")
    @RxDefinitionTransactional(readOnly = true)
    @AccessControlledMethod(authorization = AccessControlledMethod.AuthorizationLevel.ValidUser)
    @Produces(MediaType.APPLICATION_JSON)
    public AdminSetting getAdminSetting(@PathParam("bundleId") String bundleId,
                                        @PathParam("componentName") String componentName,
                                        @PathParam("settingName") String settingName) {
        AdminSetting myAdminSetting = new AdminSetting();
        String errorMessage = "";

        myAdminSetting.setBundleId(bundleId);
        myAdminSetting.setComponentName(componentName);
        myAdminSetting.setSettingName(settingName);

        // The admin header defines the scope of the search. In our case a specific bundle
        AdminHeader adminHeader = new AdminHeader();
        adminHeader.setBundleScope(bundleId);
        adminHeader.setGlobalSpace(false);

        // Getting the bundle component information
        AdminSettingDataContainer dataHolder = null;
        try {
            dataHolder = ServiceLocator.getAdminSettingsService().getAdminSettingData(componentName, adminHeader);
        } catch (Exception e) {
            errorMessage = "Could not access " + componentName + " component";
            ServiceLocator.getLogger().error(errorMessage);
            myAdminSetting.setErrorMessage(errorMessage);
            myAdminSetting.setErrorLevel("ERROR");

            return myAdminSetting;
        }

        // Getting admin settings for the given component
        Map<String, AdminSettingData> dataMap = null;
        try {
            dataMap = dataHolder.getAdminSettingDataMap();
        } catch (Exception e) {
            errorMessage = "Could not create a map for " + componentName + " component";
            ServiceLocator.getLogger().error(errorMessage);
            myAdminSetting.setErrorMessage(errorMessage);
            myAdminSetting.setErrorLevel("ERROR");

            return myAdminSetting;
        }

        if (dataMap == null) {
            errorMessage = "no dataMap found for " + componentName + " component";
            ServiceLocator.getLogger().error(errorMessage);
            myAdminSetting.setErrorMessage(errorMessage);
            myAdminSetting.setErrorLevel("ERROR");

            return myAdminSetting;
        }

        // Getting our setting...
        AdminSettingData data = null;
        try {
            data = dataMap.get(settingName);
        } catch (Exception e) {
            errorMessage = "Could not get setting " + settingName + " component";
            ServiceLocator.getLogger().error(errorMessage);
            myAdminSetting.setErrorMessage(errorMessage);
            myAdminSetting.setErrorLevel("ERROR");

            return myAdminSetting;
        }

        // Getting th setting value, usually it means there is no value saved.
        if (data == null) {
            errorMessage = "could not get data for '" + componentName + "/" + settingName + "', " + dataMap.toString();
            ServiceLocator.getLogger().info(errorMessage);
            myAdminSetting.setErrorMessage(errorMessage);
            myAdminSetting.setErrorLevel("WARN");

            return myAdminSetting;
        }

        myAdminSetting.setSettingValue(data.getSettingValue());

        return myAdminSetting;
    }
}
