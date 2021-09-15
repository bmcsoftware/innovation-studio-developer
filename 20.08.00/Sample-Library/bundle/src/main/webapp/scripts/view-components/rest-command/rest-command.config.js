(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.rest-command')
        .config(function (rxViewComponentProvider) {
            rxViewComponentProvider.registerComponent([
                {
                    name: 'Java Rest and Command',
                    group: 'Sample Library Components',
                    icon: 'server_internet',
                    type: 'com-example-samplelibrary-rest-command',
                    designType: 'com-example-samplelibrary-rest-command-design',
                    bundleId: 'com.example.samplelibrary',
                    propertiesByName: [
                        {
                            name: 'username',
                            type: 'string',
                            isConfig: true, // means input parameter
                            enableExpressionEvaluation: true
                        },
                        {
                            name: 'password',
                            type: 'string',
                            isConfig: true,
                            enableExpressionEvaluation: true
                        },
                        {
                            name: 'result',
                            type: 'string',
                            isConfig: false,    //  Will not appear as an input parameter
                            isProperty: true    //  An output parameter
                        }
                    ]
                }
            ]);
        });
})();