(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.call-action')
        .directive('comExampleSamplelibraryCallAction', function (rxAction) {
            return {
                restrict: 'E',
                templateUrl: 'scripts/view-components/call-action/com-example-samplelibrary-call-action.directive.html',

                scope: {
                    rxConfiguration: '='
                },

                link: function ($scope) {
                    $scope.actionResult = '';

                    // Calling custom Javascript Action
                    // Here we are calling the Action 'run-java-command' (/scripts/actions/run-java-command).
                    // 'name' parameter defined in 'run-java-command.config.js'
                    $scope.actionName = 'comExampleSamplelibraryRunJavaCommand';

                    // The parameters are defined in 'run-java-command.config.js' in the 'parameters" array
                    // 'commandClassName' and 'commandParameterValueList'
                    // Here we define the values for the parameters
                    $scope.parameterValues = {
                        commandClassName: 'com.example.command.TestCommand',
                        commandParameterValueList: 'inputId="1234"#inputUserName="Uncle Scrooge"'
                    };

                    rxAction.executeAction($scope.actionName)({
                        // Mapping the action parameters (key / value)
                        propertiesByName: {
                            commandClassName: $scope.parameterValues.commandClassName,
                            commandParameterValueList: $scope.parameterValues.commandParameterValueList
                        }
                    }).then(function(actionData){
                        // Here we capture the data returned (eventually) by the action
                        $scope.actionResult = actionData;
                    });
                }
            };
        });
})();