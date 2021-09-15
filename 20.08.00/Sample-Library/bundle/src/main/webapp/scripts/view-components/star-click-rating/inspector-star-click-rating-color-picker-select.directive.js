// This directive is used at design time to choose a field.
(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.star-click-rating').directive('comExampleSamplelibraryInspectorStarClickRatingColorPickerSelect', function () {
        return {
            restrict: 'E',
            templateUrl: 'scripts/view-components/star-click-rating/com-example-samplelibrary-inspector-star-click-rating-color-picker-select.directive.html',

            link: function ($scope) {
                $scope.data = {
                    fields: [],
                    selectedField: null
                };

                // Getting the color from the color picker.
                $scope.hexPickerColor = "";

                function initColor() {
                    $scope.hexPickerColor = $scope.cell.prop($scope.path);
                }

                // Saving the parameter
                $scope.saveColor = function () {
                    $scope.cell.prop($scope.path, $scope.hexPickerColor);
                };

                initColor();
            }
        };
    });
})();