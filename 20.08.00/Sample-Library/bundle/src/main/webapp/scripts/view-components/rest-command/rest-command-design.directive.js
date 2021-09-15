(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.rest-command')
        .directive('comExampleSamplelibraryRestCommandDesign', function () {
            return {
                restrict: 'E',
                templateUrl: 'scripts/view-components/rest-command/com-example-samplelibrary-rest-command-design.directive.html',

                scope: {
                    rxConfiguration: '='
                }
            };
        });
})();