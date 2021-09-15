// This directive is used at design time to choose a field.
(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.star-click-rating').directive('comExampleSamplelibraryInspectorStarClickRatingSliderSelect', function (RX_RECORD_DEFINITION, $timeout) {
        return {
            restrict: 'E',
            templateUrl: 'scripts/view-components/star-click-rating/com-example-samplelibrary-inspector-star-click-rating-slider-select.directive.html',

            link: function ($scope) {
                $scope.data = {
                    fields: [],
                    selectedField: null
                };

                // Building stars...
                $scope.minSliderValue = 0;
                $scope.slider_all_options = {};

                $scope.slider_all_options = {
                    minValue: 1,
                    options: {
                        floor: 1,
                        ceil: 10,
                        step: 1,
                        precision: 0,
                        draggableRange: false,
                        showSelectionBar: false,
                        hideLimitLabels: false,
                        readOnly: false,
                        disabled: false,
                        showTicks: false,
                        showTicksValues: false
                    }
                };

                function initMaxStarValue() {
                    $scope.minSliderValue = $scope.cell.prop($scope.path);
                }

                // Saving the parameter
                function saveMaxStarValue() {
                    $scope.cell.prop($scope.path, $scope.minSliderValue);
                }

                // We watch "$scope.minSliderValue" to save it.
                $scope.$watch('minSliderValue', saveMaxStarValue)

                initMaxStarValue();

                // Called else slider bullets are aligned to left.
                $timeout(function () {
                    $scope.$broadcast('rzSliderForceRender');
                });
            }
        };
    });
})();