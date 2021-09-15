(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.display-associated-data').directive('comExampleSamplelibraryDisplayDataDesign', function () {
        return {
            restrict: 'E',
            templateUrl: 'scripts/view-components/display-data/com-example-samplelibrary-display-data-design.directive.html',

            scope: {
                rxConfiguration: '='
            }
        };
    });
})();