(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.custom-label')
        .config(function (rxViewComponentProvider) {
            rxViewComponentProvider.registerComponent([
                {
                    name: 'Custom Label',
                    group: 'Sample Library Components',
                    icon: 'comment_text',
                    type: 'com-example-samplelibrary-custom-label',
                    designType: 'com-example-samplelibrary-custom-label-design',
                    bundleId: 'com.example.samplelibrary',
                    propertiesByName: [
                        {
                            name: 'label',
                            type: 'string',
                            isConfig: true,     // Input parameter
                            isProperty: false,  // Not an output parameter
                            isRequired: false,  // Not required
                            enableExpressionEvaluation: true    // The expression will be evaluated.
                        }
                    ]
                }
            ]);
        });
})();