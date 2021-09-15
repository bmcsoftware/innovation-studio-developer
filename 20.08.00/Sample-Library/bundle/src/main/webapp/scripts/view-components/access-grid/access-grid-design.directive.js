(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.access-grid').directive('comExampleSamplelibraryAccessGridDesign', function () {
        return {
            restrict: 'E',
            templateUrl: 'scripts/view-components/access-grid/com-example-samplelibrary-access-grid-design.directive.html',

            scope: {
                rxConfiguration: '='
            }
        };
    });
})();