(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.test-vc').directive('comExampleSamplelibraryTestVc',
        function (rxViewComponentEventManager) {
            return {
                restrict: 'E',
                templateUrl: 'scripts/view-components/test-vc/com-example-samplelibrary-test-vc.directive.html',

                scope: {
                    rxConfiguration: '='
                },

                link: function ($scope) {
                    var _config;
                    var eventManager = rxViewComponentEventManager.getInstance($scope);

                    // Getting the view component input parameters
                    _config = $scope.rxConfiguration.propertiesByName;

                    $scope.displayInputParameter = _config.inputParameter;
                    $scope.displayOutputParameter = _config.inputParameter + ', hello world';

                    eventManager.propertyChanged({
                        property: 'outputParameter',
                        oldValue: null,
                        newValue: $scope.displayOutputParameter
                    });
                }
            };
        });
})();