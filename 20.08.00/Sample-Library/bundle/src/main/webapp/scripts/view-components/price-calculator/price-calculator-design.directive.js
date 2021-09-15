(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.price-calculator')
        .directive('comExampleSamplelibraryPriceCalculatorDesign', function () {
            return {
                restrict: 'E',
                templateUrl: 'scripts/view-components/price-calculator/com-example-samplelibrary-price-calculator-design.directive.html',

                scope: {
                    rxConfiguration: '='
                }
            };
        });
})();