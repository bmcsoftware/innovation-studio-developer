(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.display-associated-data').directive('comExampleSamplelibraryDisplayAssociatedDataDesign', function () {
        return {
            restrict: 'E',
            templateUrl: 'scripts/view-components/display-associated-data/com-example-samplelibrary-display-associated-data-design.directive.html',

            scope: {
                rxConfiguration: '='
            }
        };
    });
})();