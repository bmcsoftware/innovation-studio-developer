package com.example.bundle;

import com.bmc.arsys.rx.application.common.ServiceLocator;
import com.bmc.arsys.rx.services.action.domain.Action;
import com.bmc.arsys.rx.services.common.DataPage;
import com.bmc.arsys.rx.services.common.DataPageQueryParameters;
import com.bmc.arsys.rx.services.common.Service;
import com.bmc.arsys.rx.services.common.domain.Scope;
import com.bmc.arsys.rx.services.record.RecordService;
import com.bmc.arsys.rx.services.record.domain.*;

import java.text.SimpleDateFormat;
import java.util.*;

public class AccessRecordInstances implements Service {
    private static final String DATAPAGEQUERY_TYPE_NAME = "com.bmc.arsys.rx.application.record.datapage.RecordInstanceDataPageQuery";
    private static final String RECORD_DEFINITION_NAME = "com.example.test210500:TestRecordInstances";
    private static final String ATTACHMENT_FIELD_ID = "536870913";
    private static final String SEARCH_FIELD_ID = "536870914";
    private static final String DEMO_RECORD_INSTANCE_ID = "AGGADG1AAP0IDARQRFDPRQRFDP1I78";

    /**
     * This Process activity is a Demo how to:
     * -> Create a record instance,
     * -> Get a record instance,
     * -> Update a record instance,
     * -> Delete a record instance,
     * -> Get an attachment,
     *
     * Please check those existing examples to:
     * -> Add an attachment (persistAttachment),
     * --> AttachFile.java,
     * -> Perform a datapagequery search (getRecordInstancesByIdDataPage),
     * --> TwilioTextMessage.java,
     * --> Test210500FruitDataPageQuery.java,
     */
    @Action(name = "demoRecordInstanceInJava", scope = Scope.PUBLIC)
    public void demoRecordInstanceInJava() {
        // Accessing the RecordService object.
        RecordService recordService = ServiceLocator.getRecordService();

        // Getting a record instance:
        this.getRecordInstance(recordService);

        // Updating a record instance:
        this.updateRecordInstance(recordService);

        // Getting an attachment:
        this.getAttachment(recordService);

        // Creating a record instance:
        this.createRecordInstance(recordService);

        // Deleting the record instance we just created.
        this.deleteRecordInstance(recordService);
    }

    /**
     * Example how to create a Record instance
     *
     * Note:
     * This record instance will be deleted later on by deleteRecordInstance().
     *
     * @param recordService (RecordService Object)
     */
    private void createRecordInstance(RecordService recordService) {
        RecordInstance recordInstance = new RecordInstance();

        // Getting the record definition.
        RecordDefinition testRecord = recordService.getRecordDefinition(RECORD_DEFINITION_NAME);

        // Preparing a new RecordInstance Object, we are using a helper method.
        // Here we are setting two fields with some values.
        recordInstance.setRecordDefinitionName(RECORD_DEFINITION_NAME);
        addFieldInstanceToRecordInstance(8, "New Description", recordInstance, testRecord);
        addFieldInstanceToRecordInstance(Integer.parseInt(SEARCH_FIELD_ID), "I WILL BE DELETED SOON", recordInstance, testRecord);

        // Creating the new record instance.
        recordService.createRecordInstance(recordInstance);
    }

    /**
     * With the given field Id and value, we create a field instance and add the field instance to
     * the record instance.
     *
     * @param fieldId          the field Id.
     * @param value            the value of the field.
     * @param recordInstance   the record instance to add the field instance.
     * @param recordDefinition the record definition of the record instance.
     */
    private void addFieldInstanceToRecordInstance(int fieldId,
                                                  String value,
                                                  RecordInstance recordInstance,
                                                  RecordDefinition recordDefinition) {
        FieldDefinition<?> fieldDefinition = recordDefinition.getFieldDefinitionById(fieldId);

        // Assigning the Field Instance a value for a given fieldId
        FieldInstance fieldInstance = new FieldInstance();
        // Setting the fieldId, then the value:
        fieldInstance.setId(fieldId);
        // Here the value is a String.
        fieldInstance.setValue(value);

        // Adding the fieldInstance to the recordInstance Object.
        recordInstance.getFieldInstances().put(fieldDefinition.getId(), fieldInstance);
    }

    /**
     * Example on how to get a record instance.
     *
     * @param recordService (RecordService Object)
     *
     * @return String, the value of the Description field (fieldId 8).
     */
    private String getRecordInstance(RecordService recordService) {
        String descriptionFieldValue = "";
        RecordInstance recordInstance = new RecordInstance();

        // We simply pass the record definition name and the record instanceId.
        recordInstance = recordService.getRecordInstance(RECORD_DEFINITION_NAME, DEMO_RECORD_INSTANCE_ID);

        // Getting the value for the field Id 8:
        descriptionFieldValue = recordInstance.getFieldValue(8);


        return descriptionFieldValue;
    }

    /**
     * Example on how to update a record instance.
     *
     * @param recordService (RecordService Object)
     */
    private void updateRecordInstance(RecordService recordService) {
        RecordInstance recordInstance = new RecordInstance();

        // We first get a record instance:
        recordInstance = recordService.getRecordInstance(RECORD_DEFINITION_NAME, DEMO_RECORD_INSTANCE_ID);

        // And then we modify it, adding the current time stamp.
        String timeStamp = new SimpleDateFormat("yyyy.MM.dd.HH.mm.ss").format(new java.util.Date());

        // We update the field Id 8 value (description field).
        recordInstance.setFieldValue(8, "Udpated " + timeStamp);
        recordService.updateRecordInstance(recordInstance);
    }

    /**
     * Example on how to delete a record instance.
     *
     * Note:
     *  We will search for the record instance we created in "createRecordInstance()".
     *
     * @param recordService (RecordService Object)
     */
    private void deleteRecordInstance(RecordService recordService) {
        String recordInstanceGuid = "";

        // We only get one record.
        int recordsToFetch = 1;

        // Building the dataPageQuery parameters using a helper method.
        DataPageQueryParameters dataPageQueryParameters = BuildPersonQueryParameters(recordsToFetch);

        // Executing the datapagequery.
        DataPage result = recordService.getRecordInstancesByIdDataPage(dataPageQueryParameters);

        // Fetching results.
        List<?> records = result.getData();

        // We iterate through the list of record instances.
        for (Object record : records) {
            HashMap<String, Object> mappedRecord = (HashMap<String, Object>) record;

            // We get the record instance Id (379).
            recordInstanceGuid = mappedRecord.get(Integer.toString(RecordInstance.RECORD_ID_FIELD_ID)).toString();
        }

        // To delete a record instance, we simply pass the record definition name and the record instanceId.
        recordService.deleteRecordInstance(RECORD_DEFINITION_NAME, recordInstanceGuid);
    }

    /**
     * Building the DataPageQuery Parameters.
     *
     * @return DataPageQueryParameters, the datapagequery parameters object
     */
    private DataPageQueryParameters BuildPersonQueryParameters(int recordsToFetch) {
        Map<String, List<String>> dataPageParams = new HashMap<String, List<String>>();
        int numberOfRecordsToFetch = 1;
        String qualification = "";

        // We are using the standard data page query type to get record instances.
        dataPageParams.put("dataPageType", new ArrayList<String>(Arrays.asList(DATAPAGEQUERY_TYPE_NAME)));

        // How many record instances should we retrieve
        if (recordsToFetch == 0) {
            // This constant is to tell to get all data.
            numberOfRecordsToFetch = DataPage.INFINITE_PAGE_SIZE;
        }

        dataPageParams.put("pageSize", new ArrayList<String>(Arrays.asList(Integer.toString(numberOfRecordsToFetch))));

        //List of fields to get:
        List<String> propertySelections = new ArrayList<String>();
        // Guid field Id (379)
        String guidFieldId = String.valueOf(RecordInstance.RECORD_ID_FIELD_ID);
        propertySelections.add(guidFieldId);
        // Description field Id (8)
        propertySelections.add("8");
        // Adding the list of fields to fetch to the propertySelection:
        dataPageParams.put("propertySelection", new ArrayList<String>(propertySelections));

        // Record definition to query:
        dataPageParams.put("recorddefinition", new ArrayList<String>(Arrays.asList(RECORD_DEFINITION_NAME)));

        // We start at index 0 (first "page"):
        dataPageParams.put("startIndex", new ArrayList<String>(Arrays.asList("0")));

        // Qualification, here we search the value written by the other method:
        // for example:
        // 'SEARCH_FIELD_ID' = "I WILL BE DELETED SOON"
        // '536870914' = "I WILL BE DELETED SOON"
        qualification = "'" + SEARCH_FIELD_ID + "' = \"I WILL BE DELETED SOON\" ";
        dataPageParams.put("queryExpression", new ArrayList<String>(Arrays.asList(qualification)));


        return new DataPageQueryParameters(dataPageParams);
    }

    /**
     * Example on how to get an attachment.
     *
     * @param recordService (RecordService Object)
     * @return byte[], array of bytes.
     */
    private byte[] getAttachment(RecordService recordService) {
        String fileName = "";
        Attachment attachment = null;

        // We simply pass the record definition name, the record instance Id (GUID) and the attachment field Id.
        attachment = recordService.getAttachment(RECORD_DEFINITION_NAME, DEMO_RECORD_INSTANCE_ID, ATTACHMENT_FIELD_ID);

        // Getting the attachment filename.
        // The filename has a suffix (MediaType) so we need to remove it.
        fileName = attachment.getFileName();
        String[] arrayInfosFilename = fileName.split(",MediaType");
        fileName = arrayInfosFilename[0];

        // Getting attachment content, for now we return it, but it could be sent to another provider.
        byte[] myContent = attachment.getBinaryData();


        return myContent;
    }
}