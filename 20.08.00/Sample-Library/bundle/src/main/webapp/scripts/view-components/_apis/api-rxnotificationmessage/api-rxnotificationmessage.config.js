(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.api-rxnotificationmessage')
        .config(function (rxViewComponentProvider) {
            rxViewComponentProvider.registerComponent([
                {
                    name: 'rx Notification Message',
                    group: 'Sample Library APIs',
                    icon: 'send',
                    type: 'com-example-samplelibrary-api-rxnotificationmessage',
                    designType: 'com-example-samplelibrary-api-rxnotificationmessage-design',
                    bundleId: 'com.example.samplelibrary',
                    propertiesByName: []
                }
            ]);
        });
})();