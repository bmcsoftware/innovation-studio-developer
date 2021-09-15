(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.test-vc').directive('comExampleSamplelibraryTestVcDesign', function () {
        return {
            restrict: 'E',
            templateUrl: 'scripts/view-components/test-vc/com-example-samplelibrary-test-vc-design.directive.html',

            scope: {
                rxConfiguration: '='
            }
        };
    });
})();