(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.google-map').directive('comExampleSamplelibraryGoogleMapDesign', function () {
        return {
            restrict: 'E',
            templateUrl: 'scripts/view-components/google-map/com-example-samplelibrary-google-map-design.directive.html',

            scope: {
                rxConfiguration: '='
            }
        };
    });
})();