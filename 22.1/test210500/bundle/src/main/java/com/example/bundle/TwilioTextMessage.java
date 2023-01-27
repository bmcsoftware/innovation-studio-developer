package com.example.bundle;

import com.bmc.arsys.rx.application.common.ServiceLocator;
import com.bmc.arsys.rx.services.action.domain.Action;
import com.bmc.arsys.rx.services.action.domain.ActionParameter;
import com.bmc.arsys.rx.services.common.DataPage;
import com.bmc.arsys.rx.services.common.DataPageQueryParameters;
import com.bmc.arsys.rx.services.common.Service;
import com.bmc.arsys.rx.services.common.domain.Scope;
import com.bmc.arsys.rx.services.record.RecordService;
import com.bmc.arsys.rx.services.record.domain.RecordDefinition;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.hibernate.validator.constraints.NotBlank;

import javax.validation.constraints.NotNull;
import java.io.PrintWriter;
import java.io.StringWriter;
import java.util.*;

/**
 * This service sends text message using Twilio.
 * The Twilio configuration is defined in the record definition "com.example.test210500:TwilioConfiguration".
 */
public class TwilioTextMessage implements Service {
    StringWriter errors = new StringWriter();
    private static final String CONFIGURATION_RECORD_DEFINITION = "com.example.test210500:TwilioConfiguration";
    private static final String QUERY_TYPE_RECORD_DATA = "com.bmc.arsys.rx.application.record.datapage.RecordInstanceDataPageQuery";

    /**
     * Gets the Twilio Configuration (Credentials etc...).
     * The information are stored in the Record Definition "com.example.test210500:TwilioConfiguration".
     * @return TwilioConfigurationClass Class containing the information.
     */
    private TwilioConfigurationClass getTwilioParameters() {
        TwilioConfigurationClass twilioConfigurationClass = new TwilioConfigurationClass();

        twilioConfigurationClass.setAccountSid("");
        twilioConfigurationClass.setAuthToken("");
        twilioConfigurationClass.setFromNumber("");

        int numberOfRecords = 1;
        RecordService recordService = ServiceLocator.getRecordService();
        RecordDefinition myRecord = recordService.getRecordDefinition(CONFIGURATION_RECORD_DEFINITION);
        Map<String, List<String>> dataPageParams = new HashMap<String, List<String>>();
        String myQualification = "";

        // Query parameters
        // Data page query type.
        dataPageParams.put("dataPageType", new ArrayList<String>(Arrays.asList(QUERY_TYPE_RECORD_DATA)));
        // number of records to return
        dataPageParams.put("pageSize", new ArrayList<String>(Arrays.asList(Integer.toString(numberOfRecords))));
        // List of fields to get
        List<String> propertySelections = new ArrayList<String>();
        propertySelections.add(Integer.toString(1));
        propertySelections.add(Integer.toString(7));
        propertySelections.add(Integer.toString(8));
        propertySelections.add(Integer.toString(379));
        propertySelections.add(Integer.toString(536870913)); // Twilio Account Sid
        propertySelections.add(Integer.toString(536870914)); // Twilio Auth Token
        propertySelections.add(Integer.toString(536870915)); // Twilio Sent From Phone Number (+1xxxxxxxxxx)
        dataPageParams.put("propertySelection", new ArrayList<String>(propertySelections));
        // We fetch data in the given record definition.
        dataPageParams.put("recorddefinition", new ArrayList<String>(Arrays.asList(CONFIGURATION_RECORD_DEFINITION)));
        // We start at the first record
        dataPageParams.put("startIndex", new ArrayList<String>(Arrays.asList("0")));
        // Bogus Qualification
        myQualification = "1=1";

        dataPageParams.put("queryExpression", new ArrayList<String>(Arrays.asList(myQualification)));
        // Sort (how do you say which side to sort??).
        dataPageParams.put("sortBy", new ArrayList<String>(Arrays.asList("1")));
        DataPageQueryParameters queryParameters = new DataPageQueryParameters(dataPageParams);

        //Time to loop (actually only once...).
        DataPage result = recordService.getRecordInstancesByIdDataPage(queryParameters);
        List<?> records = result.getData();

        for (Object record : records) {
            HashMap<String, Object> mappedRecord = (HashMap<String, Object>) record;
            String accountSid = sanitizeFieldValue(mappedRecord.get("536870913"));
            String authToken = sanitizeFieldValue(mappedRecord.get("536870914"));
            String fromNumber = sanitizeFieldValue(mappedRecord.get("536870915"));

            twilioConfigurationClass.setAccountSid(accountSid);
            twilioConfigurationClass.setAuthToken(authToken);
            twilioConfigurationClass.setFromNumber(fromNumber);

            return twilioConfigurationClass;
        }

        return twilioConfigurationClass;
    }

    /**
     * Sends a Text message using Twilio Java SDK.
     * @param SendTo    (String)    Phone Number (+1xxxxxxxxxx)
     * @param MessageToSend    (String)    Text to send
     * @return  String  Result
     */
    private TwilioTextResultClass sendTwilioTextMessage(String SendTo, String MessageToSend,TwilioConfigurationClass twilioConfigurationClass) {
        TwilioTextResultClass twilioTextResultClass = new TwilioTextResultClass();

        twilioTextResultClass.setErrorMessage("");
        twilioTextResultClass.setMessageSid("");
        Twilio.init(twilioConfigurationClass.getAccountSid(), twilioConfigurationClass.getAuthToken());

        try {
            Message twilioMessage = Message.creator(
                    new PhoneNumber(SendTo),
                    new PhoneNumber(twilioConfigurationClass.getFromNumber()),
                    MessageToSend
            ).create();

            twilioTextResultClass.setResult("SUCCESS");
            twilioTextResultClass.setMessageSid(twilioMessage.getSid());
        } catch (Exception e) {
            e.printStackTrace(new PrintWriter(errors));
            twilioTextResultClass.setResult("ERROR");
            twilioTextResultClass.setErrorMessage(errors.toString());
        }

        return twilioTextResultClass;
    }

    /**
     * Custom Activity that allows to send a Text message using Twilio Java SDK.
     * @param SendTo    (String)    Phone Number (+1xxxxxxxxxx)
     * @param TxtMessage    (String)    Text to send
     * @return  String  Result
     */
    @Action(name = "TwilioTextMessage",
            scope = Scope.PUBLIC)
    public TwilioTextResultClass TwilioTextMessage(
            @ActionParameter(name = "SendTo") @NotBlank @NotNull String SendTo,
            @ActionParameter(name = "Message") @NotBlank @NotNull String TxtMessage
    ) {
        TwilioConfigurationClass twilioConfigurationClass = getTwilioParameters();
        TwilioTextResultClass twilioTextResultClass = new TwilioTextResultClass();

        if (twilioConfigurationClass.getAccountSid().isEmpty()) {
            twilioTextResultClass.setResult("ERROR");
            twilioTextResultClass.setMessageSid("");
            twilioTextResultClass.setErrorMessage("Please set the credentials in the record definition com.example.convergence-utils:Configuration.");
        } else {
            twilioTextResultClass = sendTwilioTextMessage(SendTo, TxtMessage, twilioConfigurationClass);
        }

        return twilioTextResultClass;
    }

    /**
     * Sanitize a value coming from a record instance field
     * @param myObject  Object (Entry)
     * @return String   Sanitized String (empty string if the value is null).
     */
    private String sanitizeFieldValue(Object myObject) {
        if (myObject == null) {
            return "";
        }
        return myObject.toString();
    }
}
