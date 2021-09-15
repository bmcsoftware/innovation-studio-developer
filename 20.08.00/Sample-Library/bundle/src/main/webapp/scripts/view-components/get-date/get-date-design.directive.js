(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.get-date')
        .directive('comExampleSamplelibraryGetDateDesign', function () {
            return {
                restrict: 'E',
                templateUrl: 'scripts/view-components/get-date/com-example-samplelibrary-get-date-design.directive.html',

                scope: {
                    rxConfiguration: '='
                }
            };
        });
})();