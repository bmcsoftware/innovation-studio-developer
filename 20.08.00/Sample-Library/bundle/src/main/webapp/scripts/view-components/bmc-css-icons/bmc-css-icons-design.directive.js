(function () {
    'use strict';
    
    angular.module('com.example.samplelibrary.view-components.bmc-css-icons')
        .directive('comExampleSamplelibraryBmcCssIconsDesign', function () {
            return {
                restrict: 'E',
                templateUrl: 'scripts/view-components/bmc-css-icons/com-example-samplelibrary-bmc-css-icons-design.directive.html',

                scope: {
                    rxConfiguration: '='
                }
            };
        });
})();