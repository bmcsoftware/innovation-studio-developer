(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.price-calculator')
        .directive('comExampleSamplelibraryPriceCalculator', function (rxViewComponentEventManager) {
            return {
                restrict: 'E',
                templateUrl: 'scripts/view-components/price-calculator/com-example-samplelibrary-price-calculator.directive.html',

                scope: {
                    rxConfiguration: '='
                },

                link: function ($scope) {
                    // event manager is used to notify the other view components that
                    // a parameter changed.
                    var eventManager = rxViewComponentEventManager.getInstance($scope);

                    $scope.price = 0;
                    $scope.vat = 0;
                    $scope.priceWithVat = 0;

                    var calculatePriceWithVat = function () {
                        var oldPriceWithVat = $scope.priceWithVat;

                        $scope.price = $scope.rxConfiguration.propertiesByName.price;
                        $scope.vat = $scope.rxConfiguration.propertiesByName.vat;
                        $scope.priceWithVat = Number($scope.price) * (1 + Number($scope.vat) / 100);

                        // once the price with VAT is calculated, we have to notify the other view components.
                        // We broadcast that the output parameter 'priceWithVat' has been modified.
                        eventManager.propertyChanged({
                            property: 'priceWithVat',
                            oldValue: oldPriceWithVat,
                            newValue: $scope.priceWithVat
                        });
                    };

                    // update priceWithVat when either price or vat is modified
                    $scope.$watchGroup([
                        'rxConfiguration.propertiesByName.price',
                        'rxConfiguration.propertiesByName.vat'
                    ], calculatePriceWithVat);
                }
            };
        });
})();