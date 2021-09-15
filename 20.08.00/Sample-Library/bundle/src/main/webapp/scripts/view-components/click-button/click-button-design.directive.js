(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.click-button')
        .directive('comExampleSamplelibraryClickButtonDesign', function () {
            return {
                restrict: 'E',
                templateUrl: 'scripts/view-components/click-button/com-example-samplelibrary-click-button-design.directive.html',

                scope: {
                    rxConfiguration: '='
                }
            };
        });
})();