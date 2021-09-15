(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.bmc-css-icons')
        .config(function (rxViewComponentProvider) {
            rxViewComponentProvider.registerComponent([
                {
                    name: 'Available Icons',
                    group: 'Sample Library Components',
                    icon: 'parallelogram_css',
                    type: 'com-example-samplelibrary-bmc-css-icons',
                    designType: 'com-example-samplelibrary-bmc-css-icons-design',
                    bundleId: 'com.example.samplelibrary',
                    propertiesByName: [
                        {}
                    ]
                }
            ]);
        });
})();