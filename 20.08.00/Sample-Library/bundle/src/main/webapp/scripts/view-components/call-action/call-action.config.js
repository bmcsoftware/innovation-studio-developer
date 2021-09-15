(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.call-action')
        .config(function (rxViewComponentProvider) {
            rxViewComponentProvider.registerComponent([
                {
                    name: 'Call Js Action',
                    group: 'Sample Library Components',
                    icon: 'gear',
                    type: 'com-example-samplelibrary-call-action',
                    designType: 'com-example-samplelibrary-call-action-design',
                    bundleId: 'com.example.samplelibrary',
                    propertiesByName: []
                }
            ]);
        });
})();