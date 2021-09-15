(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.call-process-js').directive('comExampleSamplelibraryCallProcessJs',
        function (rxNotificationMessage,
                  rxProcessDefinitionResource,
                  rxProcessInstanceCommands,
                  rxProcessInstanceResource,
                  rxViewComponentEventManager,
                  COM_EXAMPLE_SAMPLE_CALL_PROCESS_JS) {
            return {
                restrict: 'E',
                templateUrl: 'scripts/view-components/call-process-js/com-example-samplelibrary-call-process-js.directive.html',

                scope: {
                    rxConfiguration: '='
                },

                link: function ($scope) {
                    var eventManager = rxViewComponentEventManager.getInstance($scope),
                        processName = $scope.rxConfiguration.propertiesByName.processName,
                        isProcessRunning = false,
                        parameters = {},
                        getProcessInformation = $scope.rxConfiguration.propertiesByName.automaticallyDetectProcessInputAndOutputParameters,
                        discoveredProcessInputParameters,
                        discoveredProcessOutputParameters;

                    $scope.inputParameters = [];
                    $scope.outputParameters = [];
                    $scope.processStatus = '';

                    // This code is used to set the view component parameter.
                    // We will broadcast the value so other view component who are using
                    // this value will be notified.
                    function updateProcessExecutionStatus(processStatus) {
                        $scope.processStatus = processStatus;

                        eventManager.propertyChanged({
                            property: 'processExecutionStatus',
                            oldValue: null,
                            newValue: processStatus
                        });
                    }

                    // We need to loop through the input parameters.
                    function displayInputParameters() {
                        // We are using the string passed as view component parameters (we need to convert it to an array)
                        // for example: "Movie Title,Movie Genre,Movie Release Date"
                        // or the discovered input parameters which is already an array.
                        var inputParameters = discoveredProcessInputParameters || $scope.rxConfiguration.propertiesByName.processInputParameterNameListCommaSeparated.split(','),
                            inputParametersArray = [];

                        if (inputParameters) {
                            _.forEach(inputParameters, function (inputParameter) {
                                inputParametersArray.push({
                                    inputParameterName: _.trim(inputParameter),
                                    inputParameterLabel: _.startCase(inputParameter),
                                    inputParameterValue: null
                                });
                            });

                            // We are using this array to create the input fields so the user can enter the expected values.
                            $scope.inputParameters = inputParametersArray;
                        }
                    }

                    // We need to loop through the output parameters.
                    function displayOutputParameters(processResult) {
                        // We are using the string passed as view component parameters (we need to convert it to an array)
                        // for example: "Movie information as string,Movie Object" 
                        // or the discovered output parameters which is already an array.
                        var outputParameters = discoveredProcessOutputParameters || $scope.rxConfiguration.propertiesByName.processOutputParameterNameListCommaSeparated.split(','),
                            outputParametersArray = [];

                        updateProcessExecutionStatus(COM_EXAMPLE_SAMPLE_CALL_PROCESS_JS.processStatus.done);

                        if (outputParameters) {
                            _.forEach(outputParameters, function (outputParameter) {
                                var outputParameterValue = _.get(processResult, outputParameter, COM_EXAMPLE_SAMPLE_CALL_PROCESS_JS.processStatus.notFound),
                                    isJson = false;

                                // The process can return "simple" types (text, integer etc...) but also objects created from documents.
                                // We are trying to Parse the value in Json to see if this is potentially an object or not.
                                // If so, the UI will display the parsed value in a special field. Else we will just display as a text.
                                // Even if the process returns an Object, it will actually return a stringified version of this object,
                                // that is why we need to parse it anyway.
                                try {
                                    outputParameterValue = JSON.parse(outputParameterValue);
                                    isJson = true;
                                } catch (exception) {
                                    isJson = false;
                                }

                                outputParametersArray.push({
                                    outputParameterName: _.trim(outputParameter),
                                    outputParameterLabel: _.startCase(outputParameter),
                                    outputParameterValue: outputParameterValue,
                                    outputParameterType: isJson
                                });
                            });

                            $scope.outputParameters = outputParametersArray;
                        }
                    }

                    // Launching the process.
                    $scope.launchProcess = function () {
                        $scope.outputParameters = [];
                        isProcessRunning = true;
                        updateProcessExecutionStatus(COM_EXAMPLE_SAMPLE_CALL_PROCESS_JS.processStatus.running);

                        // Mapping the process input parameters set by the user to the ones expected by the Process.
                        // The parameters is an object containing a mapping of the process input parameters and their values.
                        // For example:
                        // {
                        //     'Movie Title': 'Matrix',
                        //     'Movie Genre': '1999',
                        //     'Movie Release Date': 'Sci-Fi'
                        // }
                        _.forEach($scope.inputParameters, function (inputParameter) {
                            parameters[inputParameter.inputParameterName] = inputParameter.inputParameterValue;
                        });

                        // We are executing the process, passing the input parameters.
                        rxProcessInstanceCommands.start(processName, parameters)
                            .then(function (response) {
                                // From the response we get the process execution instanceId.
                                var processDetailsLocation = response.headers('location'),
                                    processInstanceId = _.last(processDetailsLocation.split('/'));

                                // We are trying to get the process output variables, using the proces execution instance Id.
                                rxProcessInstanceResource.forProcessDefinition(processName).get(processInstanceId + '/processOutputVariables')
                                    .then(function (processResult) {
                                        displayOutputParameters(processResult);
                                    })
                                    .catch(function (error) {
                                        updateProcessExecutionStatus(COM_EXAMPLE_SAMPLE_CALL_PROCESS_JS.processStatus.error);
                                    })
                                    .finally(function () {
                                        isProcessRunning = false;
                                    });
                            })
                            .catch(function (error) {
                                updateProcessExecutionStatus(COM_EXAMPLE_SAMPLE_CALL_PROCESS_JS.processStatus.error);
                            })
                            .finally(function () {
                                isProcessRunning = false;
                            });
                    };

                    $scope.isLaunchProcessDisabled = function () {
                        return isProcessRunning;
                    };

                    // Fetching process information if necessary
                    if (getProcessInformation) {
                        isProcessRunning = true;
                        updateProcessExecutionStatus('Fetching Process definition.');

                        // Getting the process definition
                        rxProcessDefinitionResource.get(processName)
                            .then(function (processDefinition) {
                                // Getting the input and the output parameters.
                                // We are creating simple arrays of the parameter names.
                                discoveredProcessInputParameters = _.map(processDefinition.inputParams, function (inputParameter) {
                                    return inputParameter.name;
                                });

                                discoveredProcessOutputParameters = _.map(processDefinition.outputParams, function (outputParameter) {
                                    return outputParameter.name;
                                });
                            })
                            .catch(function (error) {
                                rxNotificationMessage.error('Error getting the process definition ' + error);
                            })
                            .finally(function () {
                                updateProcessExecutionStatus('');
                                isProcessRunning = false;
                                displayInputParameters();
                            });
                    } else {
                        displayInputParameters();
                    }
                }
            };
        });
})();