(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.click-button')
        .config(function (rxViewComponentProvider) {
            rxViewComponentProvider.registerComponent([
                {
                    name: 'Trigger Action Button',
                    group: 'Sample Library Components',
                    icon: 'eye',
                    type: 'com-example-samplelibrary-click-button',
                    designType: 'com-example-samplelibrary-click-button-design',
                    bundleId: 'com.example.samplelibrary',
                    propertiesByName: [
                        {
                            name: 'buttonLabel',
                            type: 'string',
                            isConfig: true,     // Input parameter
                            isProperty: false,  // Not an output parameter
                            isRequired: true,  // Not required
                            enableExpressionEvaluation: true    // The expression will be evaluated.
                        },
                        {
                            name: 'buttonGuid',
                            type: 'string',
                            isConfig: true,     // Input parameter
                            isProperty: false,  // Not an output parameter
                            isRequired: true,  // Not required
                            enableExpressionEvaluation: true    // The expression will be evaluated.
                        }
                    ]
                }
            ]);
        });
})();