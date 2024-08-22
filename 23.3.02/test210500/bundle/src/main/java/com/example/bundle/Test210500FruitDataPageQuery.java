package com.example.bundle;

import com.bmc.arsys.rx.application.common.ServiceLocator;
import com.bmc.arsys.rx.services.common.*;
import com.bmc.arsys.rx.services.common.annotation.AccessControlledMethod;
import com.bmc.arsys.rx.services.common.annotation.RxDefinitionTransactional;
import com.bmc.arsys.rx.services.record.RecordService;
import com.bmc.arsys.rx.services.record.domain.RecordDefinition;
import org.springframework.transaction.annotation.Isolation;

import java.util.*;

/**
 * This code shows how to create a custom datapagequery.
 * For example getting Record Instances is a datapagequery provided by BMC.
 * A datapagequery will ensure data will be fetched and returned in a standardized way
 * and can be used to modify data before sending it to the UI or another service.
 *
 * It will be used in another example in a grid object, in the UI (custom-datapagequery).
 *
 * This datapageQuery will return a list of Fruits (record instances of record definition
 * "com.example.test210500:fruits").
 *
 * This example also shows how to get data from a record definition.
 *
 * The name of the datapage query is the package name and the class name:
 * package com.example.bundle;
 * public class Test210500FruitDataPageQuery
 * So:
 * com.example.bundle.Test210500FruitDataPageQuery
 *
 *  The best practice is to use the bundle name to prefix the datapage query.
 *  So here Test210500.
 *  This is to avoid collisions.
 *
 * Initial credits:
 * Dave Sulcer (BMC) and his tutorial ^_^
 */
public class Test210500FruitDataPageQuery  extends DataPageQuery {
    private static final String QUERY_TYPE_RECORD_DATA = "com.bmc.arsys.rx.application.record.datapage.RecordInstanceDataPageQuery";
    private static final String FRUITS_RECORD_DEFINITION_NAME = "com.example.test210500:fruits";
    private int pageSize = 50;
    private int startIndex = 0;

    // Constructor.
    // Setting the query parameters and getting required parameters.
    public Test210500FruitDataPageQuery(DataPageQueryParameters dataPageQueryParameters) {
        super(dataPageQueryParameters);

        // Those two parameters are a datapage required parameters.
        // Those two values can also be fetched later in the getFruits() method
        // through getDataPageQueryParameters(), for example:
        // getDataPageQueryParameters().getPageSize()
        // getDataPageQueryParameters().getStartIndex()
        pageSize = dataPageQueryParameters.getPageSize();
        startIndex = dataPageQueryParameters.getStartIndex();
    }

    /**
     * Executes the datapagequery.
     *
     * This uses the Record Service to get a list of Fruits (record definition "com.example.test210500:fruits"),
     * and for each one, modify some data (price).
     * Must be decorated by transaction directives because this code is reached directly from the generic DataPageQuery
     * implementation which is not pre-coded for access of the Record Service.
     *
     * It then returns the resulting DataPage object to the caller which is an array of serialized Fruit objects.
     *
     * The name of the datapage query is the package name and the class name:
     * package com.example.bundle;
     * public class Test210500FruitDataPageQuery
     * So:
     * com.example.bundle.Test210500FruitDataPageQuery
     *
     * Syntax:  http://{host}:{port}/api/rx/application/datapage/?
     * 		dataPageType=com.example.bundle.Test210500FruitDataPageQuery&   // required
     * 		pageSize=PAGESIZE&                              // required (by BMC datapagequery object)
     * 		startIndex=STARTINDEX&                          // required (by BMC datapagequery object)
     * 	    queryExpression=QUERYEXPRESSION                 // optional (BMC datapagequery object)
     * 	    sortBy=SORTBY                                   // optional (BMC datapagequery object)
     */
    @Override
    @RxDefinitionTransactional(readOnly = true, isolation = Isolation.DEFAULT, rollbackFor = Exception.class)
    @AccessControlledMethod(authorization = AccessControlledMethod.AuthorizationLevel.SubAdministrator, licensing = AccessControlledMethod.LicensingLevel.Application, checkSchemaForSpecialAccess = true, promoteStructAdmin = true)
    public DataPage execute() {
        List<Fruit> fruitList = new ArrayList<>();

        // Getting the list of Fruits
        fruitList = getFruits();

        // Returns the data, allowing Jackson to serialize it for us.
        return new DataPage(fruitList.size(), fruitList);
    }

    // Getting Fruits from record definition "com.example.test210500:fruits".
    // This example does not implement pagination but you can easily do it.
    private List<Fruit> getFruits() {
        List<Fruit> fruitList = new ArrayList<Fruit>();

        // This service will be used to query a record definition
        RecordService recordService = ServiceLocator.getRecordService();
        // Parameters that will be used to query the record definition
        Map<String, List<String>> dataPageParams = new HashMap<String, List<String>>();
        // Qualification, we are leveraging the OOTB query expression passed by
        // the UI grid.
        String myQualification = "";

        // Getting record definition object
        RecordDefinition myRecord = recordService.getRecordDefinition(FRUITS_RECORD_DEFINITION_NAME);

        // Building the datapage query parameters.
        // Data page query type (BMC OOTB to get record instances)
        dataPageParams.put("dataPageType", new ArrayList<String>(Arrays.asList(QUERY_TYPE_RECORD_DATA)));
        // number of records to return.
        dataPageParams.put("pageSize", new ArrayList<String>(Arrays.asList(Integer.toString(pageSize))));
        // List of fields to fetch.
        List<String> propertySelections = new ArrayList<String>();
        propertySelections.add(Integer.toString(1));
        propertySelections.add(Integer.toString(7));
        propertySelections.add(Integer.toString(8));
        propertySelections.add(Integer.toString(379));
        propertySelections.add(Integer.toString(536870913)); // Fruit name.
        propertySelections.add(Integer.toString(536870914)); // Fruit price.
        dataPageParams.put("propertySelection", new ArrayList<String>(propertySelections));
        // Fetching data from the given record definition.
        dataPageParams.put("recorddefinition", new ArrayList<String>(Arrays.asList(FRUITS_RECORD_DEFINITION_NAME)));
        // Fetch starts at the first record (index 0).
        dataPageParams.put("startIndex", new ArrayList<String>(Arrays.asList(Integer.toString(startIndex))));

        // The query expression is already taken care of by the grid in our example but we need to change
        // the labels by their Id counterparts as the qualification would be from the UI:
        // "('fruit' = \"ap\") AND ('fruit' LIKE \"%le%\")"
        // In this very simple example we only search and filter on the field 'fruit'.
        // The reason why the UI sends 'fruit' and not the fieldId is because the datapagequery and UI
        // use labels as defined in the grid configuration in:
        // src/main/webapp/libs/com-example-test210500/src/lib/view-components/custom-datapagequery/runtime/custom-datapagequery.component.ts
        // and in the Fruit class.
        myQualification = getParameterValue("queryExpression");

        if (myQualification != null && !myQualification.equals("")) {
            myQualification = myQualification.replace("'fruit'", "'536870913'");
        }

        dataPageParams.put("queryExpression", new ArrayList<String>(Arrays.asList(myQualification)));

        // Sort.
        // The sort is provided by the sortBy parameter which is an array of columns.
        // Here we can only sort on the "fruit".
        // Once again as for the qualification we have to replace the fields labels by ids.
        // But since in our example we can only have a filter on the fruit we just check if there
        // is a filter or not and the sort direction.
        if (getDataPageQueryParameters().getSortByValues().size() > 0) {
            // Ascending sort.
            String sortBy = "536870913";

            if (!getDataPageQueryParameters().getSortByValues().get(0).getIsAscending()) {
                // Descending sort.
                sortBy = "-536870913";
            }

            dataPageParams.put("sortBy", new ArrayList<String>(Arrays.asList(sortBy)));
        }

        DataPageQueryParameters queryParameters = new DataPageQueryParameters(dataPageParams);

        // Fetching records and building the list of fruits.
        DataPage result = recordService.getRecordInstancesByIdDataPage(queryParameters);
        List<?> records = result.getData();

        for (Object record : records) {
            HashMap<String, Object> mappedRecord = (HashMap<String, Object>) record;
            Fruit fruit = new Fruit();

            fruit.setFruit(sanitize_me(mappedRecord.get("536870913")));
            fruit.setDisplayId(sanitize_me(mappedRecord.get("1")));
            fruit.setGuid(sanitize_me(mappedRecord.get("379")));
            // Setting a new price (just adding $ symbol)
            fruit.setPrice(sanitize_me(mappedRecord.get("536870914")) + "$");
            fruitList.add(fruit);
        }

        return fruitList;
    }

    /**
     * Helper method to extract a parameter value from the query predicates.
     * In our case we can get this way the values of "queryExpression" for example or custom parameters
     * if there were any.
     * It will NOT return the required parameters or sortBy, see public Test210500FruitDataPageQuery(DataPageQueryParameters dataPageQueryParameters).
     *
     * Syntax:  http://{host}:{port}/api/rx/application/datapage/?
     * 		dataPageType=com.example.bundle.Test210500FruitDataPageQuery&   // required
     * 		pageSize=PAGESIZE&                              // required (by BMC datapagequery object)
     * 		startIndex=STARTINDEX&                          // required (by BMC datapagequery object)
     * 	    queryExpression=QUERYEXPRESSION                 // optional (BMC datapagequery object)
     * 	    sortBy=SORTBY                                   // optional (BMC datapagequery object)
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

    // Sanitize method to avoid null pointer exceptions.
    private String sanitize_me(Object myObject) {
        if (myObject == null) {
            return "";
        }

        return myObject.toString();
    }
}
