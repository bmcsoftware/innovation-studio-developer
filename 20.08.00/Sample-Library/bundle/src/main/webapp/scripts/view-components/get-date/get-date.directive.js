(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.get-date')
        .directive('comExampleSamplelibraryGetDate', function (rxViewComponentEventManager) {
            return {
                restrict: 'E',
                templateUrl: 'scripts/view-components/get-date/com-example-samplelibrary-get-date.directive.html',

                scope: {
                    rxConfiguration: '='
                },

                link: function ($scope) {
                    // To enable the 'refresh' action from 'Actions' in Innovation Studio you need:
                    // An output parameter in the config.js to appear in the data dictionnary (isProperty: true)
                    // A refresh function,
                    // To register your refresh function in the refresh object from rxConfiguration api,
                    // To propagate the update using the eventManager to update the Component,
                    var eventManager = rxViewComponentEventManager.getInstance($scope);

                    // This is the function that will be called by the Refresh Action. Here it allows parameters.
                    // param1 is the parameter list.
                    function refreshAction(param1) {
                        $scope.message = 'I am being refreshed at ' + moment().format('YYYY-MM-DD hh:mm:ss') + ' with parameter ' + param1;
                        getDate();
                    }

                    // first bind parameter is the 'this' object, then parameter list.
                    // Here we register the View Component method 'refreshAction' with the system.
                    $scope.rxConfiguration.api = {
                        refresh: refreshAction.bind(null, true)
                    };

                    // Here we broadcast the fact we modified the configuration, hence finishing the registration.
                    eventManager.propertyChanged({
                        property: 'api',
                        newValue: $scope.rxConfiguration.api
                    });

                    $scope.message = '';
                    $scope.returnedDate = '';

                    function getDate() {
                        $scope.returnedDate = moment().format('YYYY-MM-DD hh:mm:ss');

                        // Here we broadcast the fact that the output parameter has been modified
                        // so other view components can access it.
                        eventManager.propertyChanged({
                            property: 'returnedDate',
                            oldValue: null,
                            newValue: $scope.returnedDate
                        });
                    }

                    getDate();
                }
            };
        });
})();