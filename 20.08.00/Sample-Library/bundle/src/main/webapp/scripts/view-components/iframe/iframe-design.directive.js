(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.iframe')
        .directive('comExampleSamplelibraryIframeDesign', function () {
            return {
                restrict: 'E',
                templateUrl: 'scripts/view-components/iframe/com-example-samplelibrary-iframe-design.directive.html',

                scope: {
                    rxConfiguration: '='
                }
            };
        });
})();