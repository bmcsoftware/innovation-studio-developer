(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.nvd3-chart').directive('comExampleSamplelibraryNvd3ChartDesign', function () {
        return {
            restrict: 'E',
            templateUrl: 'scripts/view-components/nvd3-chart/com-example-samplelibrary-nvd3-chart-design.html',

            scope: {
                rxConfiguration: '='
            }
        };
    });
})();
