(function () {
    'use strict';
    
    angular.module('com.example.samplelibrary.view-components.custom-label')
        .directive('comExampleSamplelibraryCustomLabelDesign', function () {
            return {
                restrict: 'E',
                templateUrl: 'scripts/view-components/custom-label/com-example-samplelibrary-custom-label-design.directive.html',

                scope: {
                    rxConfiguration: '='
                }
            };
        });
})();