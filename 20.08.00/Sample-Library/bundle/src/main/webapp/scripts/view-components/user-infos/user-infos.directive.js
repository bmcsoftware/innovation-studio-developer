(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.user-infos')
        .directive('comExampleSamplelibraryUserInfos', function (rxCurrentUser,
                                                                 rxNotificationMessage,
                                                                 comExampleSamplelibraryUserInfosResource) {
            return {
                restrict: 'E',
                templateUrl: 'scripts/view-components/user-infos/com-example-samplelibrary-user-infos.directive.html',

                scope: {
                    rxConfiguration: '='
                },

                link: function ($scope) {
                    $scope.userInfos = {
                        uiInfos: {},
                        backendInfos: {}
                    };

                    getUserInfos();

                    function getUserInfos() {
                        // Getting session user information from the UI (Javascript)
                        _.assign($scope.userInfos.uiInfos, {
                            fullName: rxCurrentUser.get().fullName,
                            developerId: rxCurrentUser.get().developerId,
                            developerMode: rxCurrentUser.get().developerMode,
                            isAdministrator: rxCurrentUser.isAdministrator(),
                            name: rxCurrentUser.getName()
                        });

                        // Getting the user session information from the backend.
                        // To see the code check the Rest API "com/example/rest/RestGetUserInfos.java".
                        comExampleSamplelibraryUserInfosResource.getUserInfos()
                            .then(function (userInfos) {
                                rxNotificationMessage.success('Backend user session information fetched successfully');

                                // See the custom object returned by the custom rest API here "com/example/rest/UserInfos.java".
                                _.assign($scope.userInfos.backendInfos, {
                                    loginName: userInfos.loginName,
                                    userId: userInfos.userId,
                                    fullName: userInfos.fullName,
                                    emailAddress: userInfos.emailAddress,
                                    id: userInfos.id,
                                });
                            })
                            .catch(function (error) {
                                rxNotificationMessage.error('Error calling the rest Api');
                            });
                    }
                }
            };
        });
})();