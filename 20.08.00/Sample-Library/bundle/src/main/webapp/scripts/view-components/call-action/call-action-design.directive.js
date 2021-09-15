(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.call-action')
        .directive('comExampleSamplelibraryCallActionDesign', function () {
            return {
                restrict: 'E',
                templateUrl: 'scripts/view-components/call-action/com-example-samplelibrary-call-action-design.directive.html',

                scope: {
                    rxConfiguration: '='
                }
            };
        });
})();