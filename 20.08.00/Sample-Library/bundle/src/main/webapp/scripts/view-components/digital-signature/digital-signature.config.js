(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.digital-signature')
        .config(function (rxViewComponentProvider) {
            var accessGridDescriptor = {
                name: 'Digital Signature',
                group: 'Sample Library Components',
                icon: 'approved_task_form',
                type: 'com-example-samplelibrary-digital-signature',
                designType: 'com-example-samplelibrary-digital-signature-design',
                canBeEmbeddedInRecordEditor: true,
                bundleId: 'com.example.samplelibrary',

                propertiesByName: [
                    {
                        name: 'width',
                        type: 'string',
                        isConfig: true
                    },
                    {
                        name: 'height',
                        type: 'string',
                        isConfig: true
                    },
                    {
                        name: 'customCss',
                        type: 'string',
                        isConfig: true,
                        enableExpressionEvaluation: true
                    },
                    {
                        name: 'command',
                        type: 'string',
                        isConfig: true,
                        enableExpressionEvaluation: true
                    },
                    {
                        name: 'signature',
                        type: 'string',
                        isConfig: false,
                        isProperty: true
                    }
                ]
            };

            rxViewComponentProvider.registerComponent(accessGridDescriptor);
        });
})();