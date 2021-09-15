(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.admin-settings')
        .config(function (rxViewComponentProvider) {
            rxViewComponentProvider.registerComponent([
                {
                    name: 'Get Admin Settings',
                    group: 'Sample Library Components',
                    icon: 'adjust_settings',
                    type: 'com-example-samplelibrary-admin-settings',
                    designType: 'com-example-samplelibrary-admin-settings-design',
                    bundleId: 'com.example.samplelibrary',
                    propertiesByName: []
                }
            ]);
        });
})();