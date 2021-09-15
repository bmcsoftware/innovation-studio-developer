(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.star-click-rating').directive('comExampleSamplelibraryStarClickRating', function (rxViewComponentEventManager) {
        return {
            restrict: 'E',
            templateUrl: 'scripts/view-components/star-click-rating/com-example-samplelibrary-star-click-rating.directive.html',

            scope: {
                rxConfiguration: '='
            },

            link: function ($scope, $element) {
                var config = $scope.rxConfiguration.propertiesByName;
                $scope.starSelectedColor = "";
                $scope.starNotSelectedColor = "";

                // create event manager
                var eventManager = rxViewComponentEventManager.getInstance($scope);

                $scope.stars = [];

                $scope.onStarSelectHandler = function (event) {
                    var selectedIndex = _.indexOf($element.find('span'), event.target);

                    if (selectedIndex !== -1) {
                        $scope.stars = buildStarsConfiguration(selectedIndex);

                        // trigger the change property event
                        eventManager.propertyChanged({
                            property: 'selectedStarValue', // name of the property that changed
                            newValue: selectedIndex
                        });

                    }
                };

                function initialize() {
                    // reinitialize configuration each time when the input parameter change
                    $scope.$watch('rxConfiguration.propertiesByName.mappingStarValue', initializeStars);
                }

                function buildStarsConfiguration(starCount) {
                    var stars = [];

                    for (var i = 1; i <= $scope.rxConfiguration.propertiesByName.maxAmountOfStars; i++) {
                        stars[i] = {
                            icon: i <= starCount ? 'd-icon-star ' : 'd-icon-star_o ',
                            style: i <= starCount ? $scope.starSelectedColor : $scope.starNotSelectedColor
                        };
                    }

                    return stars;
                }

                function initializeStars() {
                    $scope.stars = buildStarsConfiguration($scope.rxConfiguration.propertiesByName.mappingStarValue || $scope.rxConfiguration.propertiesByName.defaultValueStars);
                    $scope.starSelectedColor = "; color:" + $scope.rxConfiguration.propertiesByName.colorStarsSelected;
                    $scope.starNotSelectedColor = "; color:" + $scope.rxConfiguration.propertiesByName.colorStarsNotSelected;
                }

                initialize();
                initializeStars();
            }

        };
    });
})();