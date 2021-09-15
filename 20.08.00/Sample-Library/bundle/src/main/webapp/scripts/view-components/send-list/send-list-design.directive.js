(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.send-list')
        .directive('comExampleSamplelibrarySendListDesign', function () {
            return {
                restrict: 'E',
                templateUrl: 'scripts/view-components/send-list/com-example-samplelibrary-send-list-design.directive.html',

                scope: {
                    rxConfiguration: '='
                }
            };
        });
})();