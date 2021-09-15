(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.display-image').directive('comExampleSamplelibraryDisplayImageDesign', function () {
        return {
            restrict: 'E',
            templateUrl: 'scripts/view-components/display-image/com-example-samplelibrary-display-image-design.directive.html',

            scope: {
                rxConfiguration: '='
            }
        };
    });
})();