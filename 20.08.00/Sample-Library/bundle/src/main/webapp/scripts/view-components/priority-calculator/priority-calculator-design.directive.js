(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.priority-calculator').directive('comExampleSamplelibraryPriorityCalculatorDesign', function () {
        return {
            restrict: 'E',
            templateUrl: 'scripts/view-components/priority-calculator/com-example-samplelibrary-priority-calculator-design.directive.html',

            scope: {
                rxConfiguration: '='
            }
        };
    });
})();