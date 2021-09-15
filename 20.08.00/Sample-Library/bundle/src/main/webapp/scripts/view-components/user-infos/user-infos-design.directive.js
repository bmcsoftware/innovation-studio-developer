(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.user-infos')
        .directive('comExampleSamplelibraryUserInfosDesign', function () {
            return {
                restrict: 'E',
                templateUrl: 'scripts/view-components/user-infos/com-example-samplelibrary-user-infos-design.directive.html',

                scope: {
                    rxConfiguration: '='
                }
            };
        });
})();