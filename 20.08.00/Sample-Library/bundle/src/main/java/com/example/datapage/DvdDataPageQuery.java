/**
 * This code shows how to create a custom datapagequery.
 * For example getting Record Instances is a datapagequery provided by BMC.
 * A datapagequery will ensure data will be fetched and returned in a standardized way
 * and can be used to modify data before sending it to the UI or another service.
 *
 * It will be used in another example in a grid object, in the UI.
 *
 * This datapageQuery will return a list of Dvds (record instances of record definition
 * "com.example.samplelibrary:Dvd").
 *
 * This example also shows how to get data from a record definition.
 *
 *
 * Credits:
 * Dave Sulcer (BMC).
 */

package com.example.datapage;

import java.util.*;

import com.bmc.arsys.rx.services.record.RecordService;
import com.bmc.arsys.rx.services.record.domain.RecordDefinition;
import org.springframework.transaction.annotation.Isolation;

import com.bmc.arsys.rx.application.common.ServiceLocator;
import com.bmc.arsys.rx.services.common.DataPage;
import com.bmc.arsys.rx.services.common.DataPageQuery;
import com.bmc.arsys.rx.services.common.DataPageQueryParameters;
import com.bmc.arsys.rx.services.common.QueryPredicate;
import com.bmc.arsys.rx.services.common.annotation.AccessControlledMethod;
import com.bmc.arsys.rx.services.common.annotation.AccessControlledMethod.AuthorizationLevel;
import com.bmc.arsys.rx.services.common.annotation.AccessControlledMethod.LicensingLevel;
import com.bmc.arsys.rx.services.common.annotation.RxDefinitionTransactional;

public class DvdDataPageQuery extends DataPageQuery {
    private static final String QUERY_TYPE_RECORD_DATA = "com.bmc.arsys.rx.application.record.datapage.RecordInstanceDataPageQuery";
    private static final String DVD_RECORD_DEFINITION_NAME = "com.example.samplelibrary:Dvd";
    private int pageSize = 50;
    private int startIndex = 0;

    // Setting the query parameters and getting required parameters
    public DvdDataPageQuery(DataPageQueryParameters dataPageQueryParameters) {
        super(dataPageQueryParameters);

        // Those two parameters are a datapage required parameters
        pageSize = dataPageQueryParameters.getPageSize();
        startIndex = dataPageQueryParameters.getStartIndex();
    }

    /**
     * Executes the datapagequery.
     *
     * This uses the Record Service to get a list of Dvds (record definition "com.example.samplelibrary:Dvd"), and for each one, modify some data (price).
     * Must be decorated by transaction directives because this code is reached directly from the generic DataPageQuery
     * implementation which is not pre-coded for access of the Record Service.
     *
     * It then returns the resulting DataPage object to the caller which is an array of serialized Dvd objects.
     *
     * The name of the datapage query is the package name and the class name:
     * package com.example.datapage;
     * public class DvdDataPageQuery
     * So:
     * com.example.datapage.DvdDataPageQuery
     *
     * Syntax:  http://{host}:{port}/api/rx/application/datapage/?
     * 		dataPageType=com.example.datapage.DvdDataPageQuery&   // required
     * 		pageSize=PAGESIZE&        // required (by BMC datapagequery object)
     * 		startIndex=STARTINDEX&    // required (by BMC datapagequery object)
     * 	    title=TITLE               // optional (can be used in our datapagequery)
     */
    @Override
    @RxDefinitionTransactional(readOnly = true, isolation = Isolation.DEFAULT, rollbackFor = Exception.class)
    @AccessControlledMethod(authorization = AuthorizationLevel.SubAdministrator, licensing = LicensingLevel.Application, checkSchemaForSpecialAccess = true, promoteStructAdmin = true)
    public DataPage execute() {
        // Required parameters cannot be fetched this way, see method public DvdDataPageQuery(DataPageQueryParameters dataPageQueryParameters) {
        String title = getParameterValue("title");
        String customFilter = getParameterValue("customFilter");

        List<Dvd> myDvds = new ArrayList<>();

        // Getting the list of Dvds
        myDvds = getDvds(title, customFilter);

        // Returns the data, allowing Jackson to serialize it for us.
        return new DataPage(myDvds.size(), myDvds);
    }

    // Getting Dvds from record definition "com.example.samplelibrary:Dvd"
    // This example does not implement qualification or pagination but you can easily do it.
    private List<Dvd> getDvds(String title, String customFilter) {
        List<Dvd> MyDvds = new ArrayList<Dvd>();

        // This service will be used to query a record definition
        RecordService recordService = ServiceLocator.getRecordService();
        // Parameters that will be used to query the record definition
        Map<String, List<String>> dataPageParams = new HashMap<String, List<String>>();
        // Qualification
        String myQualification = "";

        // Getting record definition object
        RecordDefinition myRecord = recordService.getRecordDefinition(DVD_RECORD_DEFINITION_NAME);

        // Query parameters
        // Data page query type BMC OOTB to get record instances)
        dataPageParams.put("dataPageType", new ArrayList<String>(Arrays.asList(QUERY_TYPE_RECORD_DATA)));
        // number of records to return
        dataPageParams.put("pageSize", new ArrayList<String>(Arrays.asList(Integer.toString(pageSize))));
        // List of fields to get
        List<String> propertySelections = new ArrayList<String>();
        propertySelections.add(Integer.toString(1));
        propertySelections.add(Integer.toString(7));
        propertySelections.add(Integer.toString(8));
        propertySelections.add(Integer.toString(179));
        propertySelections.add(Integer.toString(10029002)); // DVD Title
        propertySelections.add(Integer.toString(10029003)); // DVD Price
        dataPageParams.put("propertySelection", new ArrayList<String>(propertySelections));
        // We fetch data in the given record definition.
        dataPageParams.put("recorddefinition", new ArrayList<String>(Arrays.asList(DVD_RECORD_DEFINITION_NAME)));
        // We start at the first record
        dataPageParams.put("startIndex", new ArrayList<String>(Arrays.asList(Integer.toString(startIndex))));

        // Qualification is based on status and possibly the Task Type
        // The Dvd status must be "Released" (2)
        myQualification = "'7' = 2";

        // Do we want to filter by title as well?
        // It is very crude, this should be escaped of course...
        if (title != null && title.length() > 0) {
            myQualification += " AND '10029002' LIKE \"%" + title + "%\"";
        }

        // If we have a custom filter we add it
        if (customFilter != null && customFilter.length() > 0) {
            myQualification += " AND " + customFilter;
        }

        dataPageParams.put("queryExpression", new ArrayList<String>(Arrays.asList(myQualification)));
        // Sort.
        dataPageParams.put("sortBy", new ArrayList<String>(Arrays.asList("1")));
        DataPageQueryParameters queryParameters = new DataPageQueryParameters(dataPageParams);

        //Time to loop.
        DataPage result = recordService.getRecordInstancesByIdDataPage(queryParameters);
        List<?> records = result.getData();

        for (Object record : records) {
            HashMap<String, Object> mappedRecord = (HashMap<String, Object>) record;
            Dvd newDvd = new Dvd();

            newDvd.setTitle(sanitize_me(mappedRecord.get("10029002")));
            // Setting a new price (just adding $ symbol)
            newDvd.setPrice(sanitize_me(mappedRecord.get("10029003")) + "$");
            MyDvds.add(newDvd);
        }

        return MyDvds;
    }

    /**
     * Help method for extracting a parameter value from the query predicates.
     * In our case we can get this way the values of "title" etc...
     * It will NOT return the required parameters, see public DvdDataPageQuery(DataPageQueryParameters dataPageQueryParameters).
     *
     * Syntax:  http://{host}:{port}/api/rx/application/datapage/?
     * 		dataPageType=com.example.datapage.DvdDataPageQuery&   // required
     * 		pageSize=PAGESIZE&        // required (by BMC datapagequery object)
     * 		startIndex=STARTINDEX&    // required (by BMC datapagequery object)
     * 	    title=TITLE               // optional (can be used in our datapagequery)
     * @param key - name of the parameter
     * @return - the value
     */
    private String getParameterValue(String key) {
        Map<String, QueryPredicate> predicates = getDataPageQueryParameters().getQueryPredicatesByName();

        if (predicates == null) {
            return null;
        }

        QueryPredicate predicate = predicates.get(key);

        if (predicate == null) {
            return null;
        }

        return predicate.getRightOperand();
    }

    // Just a sanitize method...
    private String sanitize_me(Object myObject) {
        if (myObject == null) {
            return "";
        }

        return myObject.toString();
    }
}
