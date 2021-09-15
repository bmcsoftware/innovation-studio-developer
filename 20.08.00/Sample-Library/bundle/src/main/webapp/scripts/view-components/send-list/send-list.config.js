(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.send-list')
        .config(function (rxViewComponentProvider) {
            rxViewComponentProvider.registerComponent([
                {
                    name: 'Get Send Java Objects',
                    group: 'Sample Library Components',
                    icon: 'list',
                    type: 'com-example-samplelibrary-send-list',
                    designType: 'com-example-samplelibrary-send-list-design',
                    bundleId: 'com.example.samplelibrary',
                    propertiesByName: []
                }
            ]);
        });
})();