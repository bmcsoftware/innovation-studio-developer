(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.user-infos')
        .config(function (rxViewComponentProvider) {
            rxViewComponentProvider.registerComponent([
                {
                    name: 'Session User Infos',
                    group: 'Sample Library Components',
                    icon: 'user',
                    type: 'com-example-samplelibrary-user-infos',
                    designType: 'com-example-samplelibrary-user-infos-design',
                    bundleId: 'com.example.samplelibrary',
                    propertiesByName: []
                }
            ]);
        });
})();