(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.user-preference').directive('comExampleSamplelibraryUserPreferenceDesign', function () {
        return {
            restrict: 'E',
            templateUrl: 'scripts/view-components/user-preference/com-example-samplelibrary-user-preference-design.directive.html',

            scope: {
                rxConfiguration: '='
            }
        };
    });
})();
