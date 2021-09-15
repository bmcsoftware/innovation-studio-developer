(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.admin-settings')
        .directive('comExampleSamplelibraryAdminSettingsDesign', function () {
            return {
                restrict: 'E',
                templateUrl: 'scripts/view-components/admin-settings/com-example-samplelibrary-admin-settings-design.directive.html',

                scope: {
                    rxConfiguration: '='
                }
            };
        });
})();