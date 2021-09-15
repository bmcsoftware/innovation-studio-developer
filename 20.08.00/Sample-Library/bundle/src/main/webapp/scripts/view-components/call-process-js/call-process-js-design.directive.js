(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.call-process-js').directive('comExampleSamplelibraryCallProcessJsDesign', function () {
        return {
            restrict: 'E',
            templateUrl: 'scripts/view-components/call-process-js/com-example-samplelibrary-call-process-js-design.directive.html',

            scope: {
                rxConfiguration: '='
            }
        };
    });
})();