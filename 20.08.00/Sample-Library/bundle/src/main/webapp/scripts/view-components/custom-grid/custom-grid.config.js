(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.custom-grid')
        .config(function (rxViewComponentProvider) {
            rxViewComponentProvider.registerComponent([
                {
                    name: 'Custom Grid',
                    group: 'Sample Library Components',
                    icon: 'table_plug',
                    type: 'com-example-samplelibrary-custom-grid',
                    designType: 'com-example-samplelibrary-custom-grid-design',
                    bundleId: 'com.example.samplelibrary',
                    propertiesByName: [
                        {
                            name: 'datapagequeryName',
                            label: 'DatapageQuery Name',
                            isConfig: true,
                            isRequired: true,
                            enableExpressionEvaluation: true
                        },
                        {
                            name: 'titleFilter',
                            label: 'Title should contain',
                            isConfig: true,
                            enableExpressionEvaluation: true
                        },
                        {
                            name: 'selectedTitle',
                            isConfig: false,
                            isProperty: true    //  An output parameter
                        }
                    ]
                }
            ]);
        });
})();