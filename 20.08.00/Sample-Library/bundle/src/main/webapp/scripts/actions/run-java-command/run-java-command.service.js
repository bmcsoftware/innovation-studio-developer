(function () {
    'use strict';
    // This action calls a custom Java Command using a POST $http call and returns the result.
    // Note, you can also use the rxCommandResource which is documented in another example.

    angular.module('com.example.samplelibrary.actions.run-java-command').service("comExampleSamplelibraryRunJavaCommand", function ($q, $http) {
            // Declaring an utility function.
            // The function must return a promise ($q) or an $http call...

            // Calling the server side Java command
            function callCommand(commandURL, commandClassName, commandParameterValueList) {
                var dataObject = {};

                // We gather the parameter name list and parameter data list.
                // Pair parameter/value are separated by "=" and pairs are separated by "#".
                // For example:
                // id="test"#userName="uncle"
                var pairsList = commandParameterValueList.split('#');
                for (var k = 0; k < pairsList.length; k++) {
                    if (pairsList[k] != "") {
                        var paramValue = pairsList[k].split('=');
                        dataObject[paramValue[0]] = paramValue[1];
                    }
                }

                /*
                // The separator is a carriage return (\n)
                var paramNameList = commandParameterNameList.split('\n');
                var paramDataList = commandParameterData.split('\n');

                // Creating the Javascript object, for example
                // {
                //     "id": 'toto',
                //     "userName": "test"
                // }
                for (var k=0;k<paramNameList.length;k++){
                    if (paramNameList[k]!=""){
                        dataObject[paramNameList[k]]=paramDataList[k];
                    }
                }
                */

                // Adding the Java class Name resource to the javascript object
                // For example:
                // "resourceType": "com.example.command.TestCommand"
                /*{
                     "id": 'toto',
                     "userName": "test",
                     "resourceType": "com.example.command.TestCommand"
                 }*/
                dataObject["resourceType"] = commandClassName;

                var req = {
                    method: 'POST',
                    url: commandURL,
                    headers: {
                        'Content-Type': 'application/json',
                        'X-Requested-By': 'X'
                    },
                    data: dataObject
                };

                return $http(req);
            }

            return {
                // code executed at runtime.
                execute: function (commandClassName, commandParameterValueList) {
                    // commandURL is hard coded since it's an internal call
                    var commandURL = "/api/rx/application/command";

                    // Calling the Java command
                    return callCommand(commandURL, commandClassName, commandParameterValueList).then(function (response) {
                        // Returning the value (commandResult output parameter).
                        var myOutputValues = {CommandResult: response.data};
                        return myOutputValues;
                    });
                },
                // Declaring the output parameter. It will be available to the next actions as "available values / actions"
                getOutputParams: function () {
                    return $q.when([
                        {name: 'CommandResult'}
                    ]);
                }
            }
        }
    )
})();
