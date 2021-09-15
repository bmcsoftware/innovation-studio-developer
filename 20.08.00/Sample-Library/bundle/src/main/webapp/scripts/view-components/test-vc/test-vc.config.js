(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.test-vc')
        .config(function (rxViewComponentProvider) {
            var starRatingDescriptor = {
                name: 'Test View Component',
                group: 'Sample Library Components',
                icon: 'word_square',
                type: 'com-example-samplelibrary-test-vc',  // the name of runtime directive
                designType: 'com-example-samplelibrary-test-vc-design', // register design directive
                bundleId: 'com.example.samplelibrary',

                // define component properties
                propertiesByName: [
                    {
                        name: 'inputParameter',
                        isConfig: true,
                        type: 'string',
                        isRequired: true
                    },
                    {
                        name: 'outputParameter',
                        isConfig: false,
                        isProperty: true
                    }
                ]
            };

            rxViewComponentProvider.registerComponent(starRatingDescriptor);
        });
})();