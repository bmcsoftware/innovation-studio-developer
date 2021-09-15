(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.iframe')
        .config(function (rxViewComponentProvider) {
            rxViewComponentProvider.registerComponent([
                {
                    name: 'iFrame',
                    group: 'Sample Library Components',
                    icon: 'layout_preview',
                    type: 'com-example-samplelibrary-iframe',
                    designType: 'com-example-samplelibrary-iframe-design',
                    bundleId: 'com.example.samplelibrary',
                    propertiesByName: [
                        {
                            name: 'url',
                            label: 'Url',
                            isConfig: true,
                            isRequired: true,
                            enableExpressionEvaluation: true
                        }
                    ]
                }
            ]);
        });
})();