(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.trigger-activity')
        .directive('comExampleSamplelibraryTriggerActivityDesign', function () {
            return {
                restrict: 'E',
                templateUrl: 'scripts/view-components/trigger-activity/com-example-samplelibrary-trigger-activity-design.directive.html',

                scope: {
                    rxConfiguration: '='
                }
            };
        });
})();