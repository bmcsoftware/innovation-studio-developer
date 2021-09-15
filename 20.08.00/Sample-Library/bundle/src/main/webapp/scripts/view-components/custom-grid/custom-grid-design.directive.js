(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.custom-grid')
        .directive('comExampleSamplelibraryCustomGridDesign', function () {
            return {
                restrict: 'E',
                templateUrl: 'scripts/view-components/custom-grid/com-example-samplelibrary-custom-grid-design.directive.html',

                scope: {
                    rxConfiguration: '='
                }
            };
        });
})();