(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.get-user-infos')
        .config(function (rxViewComponentProvider) {
            rxViewComponentProvider.registerComponent([
                {
                    name: 'Get User Infos',
                    group: 'Sample Library Components',
                    icon: 'user',
                    type: 'com-example-samplelibrary-get-user-infos',
                    designType: 'com-example-samplelibrary-get-user-infos-design',
                    bundleId: 'com.example.samplelibrary',
                    propertiesByName: [

                        {
                            name: 'isBusinessAnalyst',
                            type: 'boolean',
                            isProperty: true
                        },
                        {
                            name: 'isTenantAdmin',
                            type: 'boolean',
                            isProperty: true
                        },
                        {
                            name: 'isSaasAdmin',
                            type: 'boolean',
                            isProperty: true
                        },
                        {
                            name: 'isAdministrator',
                            type: 'boolean',
                            isProperty: true
                        },
                        {
                            name: 'developerMode',
                            type: 'boolean',
                            isProperty: true
                        },
                        {
                            name: 'isDevelopmentEnvironment',
                            type: 'string',
                            isProperty: true
                        },
                        {
                            name: 'isDevelopmentAllowed',
                            type: 'boolean',
                            isProperty: true
                        },
                        {
                            name: 'isProductionEnvironment',
                            type: 'boolean',
                            isProperty: true
                        },
                        {
                            name: 'loginId',
                            type: 'string',
                            isProperty: true
                        },
                        {
                            name: 'name',
                            type: 'string',
                            isProperty: true
                        },
                        {
                            name: 'serverInstanceType',
                            type: 'string',
                            isProperty: true
                        },
                        {
                            name: 'developerId',
                            type: 'string',
                            isProperty: true
                        },
                        {
                            name: 'fullName',
                            type: 'string',
                            isProperty: true
                        },
                        {
                            name: 'preferredLocale',
                            type: 'string',
                            isProperty: true
                        },
                        {
                            name: 'preferredUserLocale',
                            type: 'string',
                            isProperty: true
                        },
                        {
                            name: 'personInstanceId',
                            type: 'string',
                            isProperty: true
                        },
                        {
                            name: 'userId',
                            type: 'string',
                            isProperty: true
                        }
                    ]
                }
            ]);
        });
})();
