(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.custom-label')
        .directive('comExampleSamplelibraryCustomLabel', function () {
            return {
                restrict: 'E',
                templateUrl: 'scripts/view-components/custom-label/com-example-samplelibrary-custom-label.directive.html',
                scope: {
                    rxConfiguration: '='
                }
            };
        });
})();