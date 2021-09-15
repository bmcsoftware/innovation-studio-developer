(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.iframe')
        .directive('comExampleSamplelibraryIframe', function ($sce) {
            return {
                restrict: 'E',
                templateUrl: 'scripts/view-components/iframe/com-example-samplelibrary-iframe.directive.html',

                scope: {
                    rxConfiguration: '='
                },

                link: function ($scope) {
                    $scope.trustSrc = function(url) {
                        return $sce.trustAsResourceUrl(url);
                    };

                    $scope.url = $scope.rxConfiguration.propertiesByName.url;
                }
            };
        });
})();