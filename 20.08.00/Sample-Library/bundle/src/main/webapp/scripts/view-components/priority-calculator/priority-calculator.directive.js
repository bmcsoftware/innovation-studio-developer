(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.priority-calculator').directive('comExampleSamplelibraryPriorityCalculator',
        function (rxViewComponentEventManager) {
            return {
                restrict: 'E',
                templateUrl: 'scripts/view-components/priority-calculator/com-example-samplelibrary-priority-calculator.directive.html',

                // rxConfiguration is used to get input parameters
                scope: {
                    rxConfiguration: '='
                },

                link: function ($scope) {
                    $scope.urgency = 0;
                    $scope.impact = 0;
                    $scope.priority = 0;

                    // rxViewComponentEventManager is used to broadcast a parameter to other view components
                    var eventManager = rxViewComponentEventManager.getInstance($scope);

                    // Function that calculates the priority
                    var calculatePriority = function () {
                        var oldPriority = $scope.priority;
                        // Getting all parameters (urgency, impact).
                        $scope.urgency = $scope.rxConfiguration.propertiesByName.urgency;
                        $scope.impact = $scope.rxConfiguration.propertiesByName.impact;

                        // Calculating the priority (here it's just random number from 0 to 4).
                        $scope.priority = Math.floor((Math.random() * 5));

                        // Once the priority is calculated, we broadcast it to other View Components.
                        eventManager.propertyChanged({
                            property: 'priority',
                            oldValue: oldPriority,
                            newValue: $scope.priority
                        });

                    };

                    // We call the "calculatePriority" function each time the input parameters "urgency" and "impact" are modified (input parameters)
                    $scope.$watchGroup([
                        'rxConfiguration.propertiesByName.urgency',
                        'rxConfiguration.propertiesByName.impact'
                    ], calculatePriority);
                }
            };
        });
})();