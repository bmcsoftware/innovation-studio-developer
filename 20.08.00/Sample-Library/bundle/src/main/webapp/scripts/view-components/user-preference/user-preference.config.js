(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.user-preference')
        .config(function (rxViewComponentProvider) {
            var starRatingDescriptor = {
                name: 'Test User Preferences',
                group: 'Sample Library Components',
                icon: 'cassette',
                type: 'com-example-samplelibrary-user-preference',
                designType: 'com-example-samplelibrary-user-preference-design',
                bundleId: 'com.example.samplelibrary',

                propertiesByName: [
                    {
                        name: 'text',
                        isConfig: true,
                        type: 'string',
                        isRequired: true
                    }
                ]
            };

            rxViewComponentProvider.registerComponent(starRatingDescriptor);
        });
})();
