(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.star-rating').directive('comExampleSamplelibraryStarRating', function (rxRecordInstanceResource, rxViewComponentEventManager) {
        return {
            restrict: 'E',
            templateUrl: 'scripts/view-components/star-rating/com-example-samplelibrary-star-rating.directive.html',

            scope: {
                rxConfiguration: '='
            },

            link: function ($scope, $element) {
                var config = $scope.rxConfiguration.propertiesByName;
                var recordResource = rxRecordInstanceResource.withName(config.recordDefinitionName);
                var recordInstance = null;

                // create event manager
                var eventManager = rxViewComponentEventManager.getInstance($scope);

                $scope.stars = [];

                $scope.onStarSelectHandler = function (event) {
                    var selectedIndex = _.indexOf($element.find('span'), event.target);

                    if (selectedIndex !== -1) {
                        $scope.stars = buildStarsConfiguration(selectedIndex);

                        // trigger the change property event
                        eventManager.propertyChanged({
                            property: 'stars', // name of the property that changed
                            newValue: selectedIndex
                        });

                        recordInstance.setValue(config.fieldId, selectedIndex);
                        recordInstance.save();
                    }
                };

                initialize();

                function initialize() {
                    // reinitialize configuration each time when recordInstanceId is changed
                    $scope.$watch('rxConfiguration.propertiesByName.recordInstanceId', initializeStars);
                }

                function initializeStars() {
                    if (config.recordInstanceId) {
                        recordResource.get(config.recordInstanceId).then(function (recordInstanceResource) {
                            recordInstance = recordInstanceResource;
                            $scope.stars = buildStarsConfiguration(recordInstanceResource.fieldInstances[config.fieldId].value || 0);
                        }).catch(function () {
                            $scope.stars = [];
                        });
                    } else {
                        $scope.stars = [];
                    }
                }

                function buildStarsConfiguration(starCount) {
                    var stars = [];

                    for (var i = 1; i <= config.stars; i++) {
                        stars[i] = {
                            icon: i <= starCount ? 'd-icon-star' : 'd-icon-star_o'
                        };
                    }

                    return stars;
                }
            }
        };
    });
})();