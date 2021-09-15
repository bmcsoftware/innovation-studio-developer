(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.api-rxnotificationmessage')
        .directive('comExampleSamplelibraryApiRxnotificationmessageDesign', function () {
            return {
                restrict: 'E',
                templateUrl: 'scripts/view-components/_apis/api-rxnotificationmessage/com-example-samplelibrary-api-rxnotificationmessage-design.directive.html',

                scope: {
                    rxConfiguration: '='
                }
            };
        });
})();