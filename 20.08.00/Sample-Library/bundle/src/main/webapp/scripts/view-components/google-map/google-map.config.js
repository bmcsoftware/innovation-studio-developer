(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.google-map')
        .config(function (rxViewComponentProvider) {
            var accessGridDescriptor = {
                name: 'Google Map',
                group: 'Sample Library Components',
                icon: 'mapmarker',
                type: 'com-example-samplelibrary-google-map',
                designType: 'com-example-samplelibrary-google-map-design',
                bundleId: 'com.example.samplelibrary',

                propertiesByName: [
                    {
                        name: 'address',    // This will be the adress to be searched and displayed in Google maps
                        type: 'string',
                        isConfig: true,
                        isRequired: true,
                        enableExpressionEvaluation: true
                    },
                    {
                        name: 'googleMapApiKey',    // Google Api key to access Google Maps and Geolocator apis.
                        type: 'string',
                        isConfig: true,
                        enableExpressionEvaluation: true
                    },
                    {
                        name: 'size',   // view component dimensions.
                        type: 'integer',
                        isConfig: true
                    }
                ]
            };

            rxViewComponentProvider.registerComponent(accessGridDescriptor);
        });
})();