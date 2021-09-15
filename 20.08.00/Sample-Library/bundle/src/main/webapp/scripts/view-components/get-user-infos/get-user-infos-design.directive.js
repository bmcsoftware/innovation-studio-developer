(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.get-user-infos')
        .directive('comExampleSamplelibraryGetUserInfosDesign', function () {
            return {
                restrict: 'E',
                templateUrl: 'scripts/view-components/get-user-infos/com-example-samplelibrary-get-user-infos-design.directive.html',

                scope: {
                    rxConfiguration: '='
                }
            };
        });
})();
