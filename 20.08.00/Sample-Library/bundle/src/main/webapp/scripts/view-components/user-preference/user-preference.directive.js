(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.user-preference').directive('comExampleSamplelibraryUserPreference',
        function (rxNotificationMessage,
                  COM_EXAMPLE_SAMPLE_LIBRARY_USER_PREFERENCE,
                  comExampleSamplelibraryUserPreferenceServices) {
            return {
                restrict: 'E',
                templateUrl: 'scripts/view-components/user-preference/com-example-samplelibrary-user-preference.directive.html',

                scope: {
                    rxConfiguration: '='
                },

                link: function ($scope) {
                    // Getting the view component input parameters
                    var _config = $scope.rxConfiguration.propertiesByName,
                        // Unique identifier of a view component. Generated automatically when the view component
                        // Generated automatically when the view component is used in a view.
                        componentId = $scope.rxConfiguration.guid,
                        viewComponentUserPreferenceInstance;

                    $scope.text = _config.text;

                    // Updating the user preferences if necessary
                    $scope.updateColor = function() {
                        if ($scope.selectedColor && viewComponentUserPreferenceInstance) {
                            viewComponentUserPreferenceInstance.setColor($scope.selectedColor)
                                .then(function() {
                                    rxNotificationMessage.success('User Preferences have been saved successfully.');
                                })
                                .catch(function() {
                                    rxNotificationMessage.error('Error saving user preferences.');
                                });
                        }
                    };

                    function getUserPreferences() {
                        // Creating a user preference object for our view component
                        viewComponentUserPreferenceInstance = comExampleSamplelibraryUserPreferenceServices.getInstance(componentId);

                        // Getting preferences
                        viewComponentUserPreferenceInstance.getPreferences()
                            .then(function (preferences) {
                                // Checking if we have our color property saved.
                                $scope.selectedColor = _.get(preferences, COM_EXAMPLE_SAMPLE_LIBRARY_USER_PREFERENCE.colorProperty);
                            })
                            .catch(function (error) {
                                rxNotificationMessage.error('Error fetching User Preferences.');
                            });
                    }

                    // Getting user preferences.
                    getUserPreferences();
                }
            };
        });
})();
