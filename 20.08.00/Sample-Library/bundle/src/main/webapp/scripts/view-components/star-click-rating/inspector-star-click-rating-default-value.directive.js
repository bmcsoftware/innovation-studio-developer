// This directive is used at design time to choose a field.
(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.star-click-rating').directive('comExampleSamplelibraryInspectorStarClickRatingDefaultValue', function () {
        return {
            restrict: 'E',
            templateUrl: 'scripts/view-components/star-click-rating/com-example-samplelibrary-inspector-star-click-rating-default-value.directive.html',

            link: function ($scope, $element) {
                $scope.data = {
                    fields: [],
                    selectedField: null
                };

                // Building stars...
                $scope.stars = [];
                $scope.starSelectedColor = "";
                $scope.starNotSelectedColor = "";

                function buildStarsConfiguration(starCount) {
                    var stars = [];

                    for (var i = 1; i <= $scope.maxAmountOfStars; i++) {
                        stars[i] = {
                            icon: i <= starCount ? 'd-icon-star spanStarSelected' : 'd-icon-star_o spanStarNotSelected'
                        };
                    }

                    return stars;
                }

                // Called when the user clicks on the star ranking in the input parameter
                $scope.onStarSelectHandler = function (event) {
                    var selectedIndex = _.indexOf($element.find('span'), event.target);

                    if (selectedIndex !== -1) {
                        $scope.stars = buildStarsConfiguration(selectedIndex);
                    }

                    // Saving the parameter
                    $scope.cell.prop($scope.path, selectedIndex);
                };

                function initStarValue() {
                    $scope.starSelectedColor = $scope.cell.prop('rxData/colorStarsSelected');
                    $scope.starNotSelectedColor = $scope.cell.prop('rxData/colorStarsNotSelected');

                    $scope.starValue = $scope.cell.prop($scope.path);
                    $scope.maxAmountOfStars = $scope.cell.prop('rxData/maxAmountOfStars');
                    if ($scope.starValue > $scope.maxAmountOfStars) {
                        $scope.starValue = "1";
                        $scope.cell.prop($scope.path, $scope.starValue);
                    }

                    $scope.stars = buildStarsConfiguration($scope.starValue);
                }

                initStarValue();
                $scope.$watchGroup(['cell.prop("rxData/maxAmountOfStars")',
                        'cell.prop("rxData/colorStarsSelected")',
                        'cell.prop("rxData/colorStarsNotSelected")'],
                    initStarValue);
            }
        };
    });
})();