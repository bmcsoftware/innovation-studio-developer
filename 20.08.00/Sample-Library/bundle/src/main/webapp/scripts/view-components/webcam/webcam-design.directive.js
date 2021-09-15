(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.webcam').directive('comExampleSamplelibraryWebcamDesign', function () {
        return {
            restrict: 'E',
            templateUrl: 'scripts/view-components/webcam/com-example-samplelibrary-webcam-design.directive.html',

            scope: {
                rxConfiguration: '='
            }
        };
    });
})();
