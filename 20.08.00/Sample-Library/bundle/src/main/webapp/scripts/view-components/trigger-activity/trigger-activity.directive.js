(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.trigger-activity')
        .directive('comExampleSamplelibraryTriggerActivity', function (rxNotificationMessage,
                                                                       comExampleSamplelibraryTriggerActivityResource) {
            return {
                restrict: 'E',
                templateUrl: 'scripts/view-components/trigger-activity/com-example-samplelibrary-trigger-activity.directive.html',

                scope: {
                    rxConfiguration: '='
                },

                link: function ($scope) {
                    $scope.isFetchInProgress = false;
                    $scope.password = '';

                    var _config = $scope.rxConfiguration.propertiesByName;

                    $scope.getPassword = function() {
                        // The input parameters are automatically refreshed.
                        var username = _config.username;

                        if (username) {
                            $scope.isFetchInProgress = true;

                            // To see the code check the Rest API "com/example/rest/RestTriggerActivity.java".
                            comExampleSamplelibraryTriggerActivityResource.callGeneratePassword(username)
                                .then(function (activityResult) {
                                    rxNotificationMessage.success('Password fetched successfully');

                                    // See the custom object returned by the custom rest API here "com/example/rest/RestTriggerActivity.java".
                                    // The output is an activity object, here under the form of:
                                    // {"output":{"password":"test, password","userName":"test"}}
                                    $scope.password = activityResult.output.password;
                                })
                                .catch(function (error) {
                                    rxNotificationMessage.error('Error calling the rest Api');
                                })
                                .finally(function () {
                                    // Called after .then() or .catch().
                                    $scope.isFetchInProgress = false;
                                });
                        } else {
                            rxNotificationMessage.error('Please enter an username');
                        }
                    }
                }
            };
        });
})();