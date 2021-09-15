(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.rest-command')
        .directive('comExampleSamplelibraryRestCommand', function (rxNotificationMessage,
                                                                   rxViewComponentEventManager,
                                                                   comExampleSamplelibraryResource) {
            return {
                restrict: 'E',
                templateUrl: 'scripts/view-components/rest-command/com-example-samplelibrary-rest-command.directive.html',

                scope: {
                    rxConfiguration: '='
                },

                link: function ($scope) {
                    // event manager is used to notify the other view components that
                    // a parameter changed.
                    var eventManager = rxViewComponentEventManager.getInstance($scope);

                    $scope.username = '';
                    $scope.password = '';
                    $scope.result = '';

                    function callCommandAndRestAPI() {
                        $scope.username = $scope.rxConfiguration.propertiesByName.username;
                        $scope.password = $scope.rxConfiguration.propertiesByName.password;
                        $scope.result = '';

                        // We are calling the resource handling the Command. It is a promise.
                        comExampleSamplelibraryResource.testCommand($scope.username, $scope.password).then(function(resultCommand) {
                            rxNotificationMessage.info('Command call executed!');

                            // We are calling the resource handling the Rest API. It is a promise.
                            comExampleSamplelibraryResource.testRestAPI($scope.username).then(function(resultRestAPI) {
                                $scope.result = resultRestAPI.password;

                                // Once we have the result, we have to notify the other view components.
                                // We broadcast that the output parameter 'result' has been modified.
                                eventManager.propertyChanged({
                                    property: 'result',
                                    oldValue: null,
                                    newValue: $scope.result
                                });

                                rxNotificationMessage.info('Hello ' + resultRestAPI.userName + ', your new password is ' + resultRestAPI.password);
                            })
                        })
                    }

                    // update priceWithVat when either price or vat is modified
                    $scope.$watchGroup([
                        'rxConfiguration.propertiesByName.username',
                        'rxConfiguration.propertiesByName.password'
                    ], callCommandAndRestAPI);
                }
            };
        });
})();