(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.webcam')
        .config(function (rxViewComponentProvider) {
            var accessGridDescriptor = {
                name: 'Webcam',
                group: 'Sample Library Components',
                icon: 'webcamera',
                type: 'com-example-samplelibrary-webcam',
                designType: 'com-example-samplelibrary-webcam-design',
                bundleId: 'com.example.samplelibrary',

                propertiesByName: [
                    {
                        name: 'base64Image',    // This will be used to broadcast the capture base64 picture
                        type: 'string',
                        isConfig: false,
                        isProperty: true
                    }
                ]
            };

            rxViewComponentProvider.registerComponent(accessGridDescriptor);
        });
})();
