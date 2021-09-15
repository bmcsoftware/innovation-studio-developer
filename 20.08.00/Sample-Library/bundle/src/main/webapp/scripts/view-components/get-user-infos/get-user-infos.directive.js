(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.get-user-infos')
        .directive('comExampleSamplelibraryGetUserInfos', function (rxCurrentUser,
                                                                    rxViewComponentEventManager) {
            return {
                restrict: 'E',
                templateUrl: 'scripts/view-components/get-user-infos/com-example-samplelibrary-get-user-infos.directive.html',

                scope: {
                    rxConfiguration: '='
                },

                link: function ($scope) {
                    var eventManager = rxViewComponentEventManager.getInstance($scope);

                    // Broadcasting the values as Output parameters
                    eventManager.propertyChanged({
                        property: 'isBusinessAnalyst',
                        oldValue: null,
                        newValue: rxCurrentUser.isBusinessAnalyst()
                    });

                    eventManager.propertyChanged({
                        property: 'isTenantAdmin',
                        oldValue: null,
                        newValue: rxCurrentUser.isTenantAdmin()
                    });

                    eventManager.propertyChanged({
                        property: 'isSaasAdmin',
                        oldValue: null,
                        newValue: rxCurrentUser.isSaasAdmin()
                    });

                    eventManager.propertyChanged({
                        property: 'isAdministrator',
                        oldValue: null,
                        newValue: rxCurrentUser.isAdministrator()
                    });

                    eventManager.propertyChanged({
                        property: 'developerMode',
                        oldValue: null,
                        newValue: rxCurrentUser.get().developerMode
                    });

                    eventManager.propertyChanged({
                        property: 'isDevelopmentEnvironment',
                        oldValue: null,
                        newValue: rxCurrentUser.isDevelopmentEnvironment()
                    });

                    eventManager.propertyChanged({
                        property: 'isDevelopmentAllowed',
                        oldValue: null,
                        newValue: rxCurrentUser.isDevelopmentAllowed()
                    });

                    eventManager.propertyChanged({
                        property: 'isProductionEnvironment',
                        oldValue: null,
                        newValue: rxCurrentUser.isProductionEnvironment()
                    });

                    // LoginId and name are the same thing.
                    eventManager.propertyChanged({
                        property: 'loginId',
                        oldValue: null,
                        newValue: rxCurrentUser.getName()
                    });

                    // LoginId and name are the same thing.
                    eventManager.propertyChanged({
                        property: 'name',
                        oldValue: null,
                        newValue: rxCurrentUser.getName()
                    });

                    eventManager.propertyChanged({
                        property: 'serverInstanceType',
                        oldValue: null,
                        newValue: rxCurrentUser.get().serverInstanceType
                    });

                    eventManager.propertyChanged({
                        property: 'developerId',
                        oldValue: null,
                        newValue: rxCurrentUser.get().developerId
                    });

                    eventManager.propertyChanged({
                        property: 'fullName',
                        oldValue: null,
                        newValue: rxCurrentUser.get().fullName
                    });

                    eventManager.propertyChanged({
                        property: 'preferredLocale',
                        oldValue: null,
                        newValue: _.isFunction(rxCurrentUser.getPreferredLocale) ? rxCurrentUser.getPreferredLocale : ''
                    });

                    eventManager.propertyChanged({
                        property: 'preferredUserLocale',
                        oldValue: null,
                        newValue: _.isFunction(rxCurrentUser.getPreferredUserLocale) ? rxCurrentUser.getPreferredUserLocale : ''
                    });

                    eventManager.propertyChanged({
                        property: 'personInstanceId',
                        oldValue: null,
                        newValue: rxCurrentUser.get().personInstanceId
                    });

                    eventManager.propertyChanged({
                        property: 'userId',
                        oldValue: null,
                        newValue: rxCurrentUser.get().userId
                    });
                }
            };
        });
})();
