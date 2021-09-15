(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.access-grid')
        .config(function (rxViewComponentProvider) {
            var accessGridDescriptor = {
                name: 'Accessing Grid Apis',
                group: 'Sample Library Components',
                icon: 'table_plug',
                type: 'com-example-samplelibrary-access-grid',
                designType: 'com-example-samplelibrary-access-grid-design',
                bundleId: 'com.example.samplelibrary',

                propertiesByName: [
                    {
                        name: 'rowIndex',
                        label: 'row index to select',
                        isConfig: true,
                        isRequired: true,
                        enableExpressionEvaluation: true,
                        editor: 'rx-expression-field'
                    },
                    {
                        name: 'gridObject',
                        label: 'Grid Object',
                        isConfig: true,
                        isRequired: true,
                        enableExpressionEvaluation: true,
                        editor: 'rx-expression-field'
                    }
                ]
            };

            rxViewComponentProvider.registerComponent(accessGridDescriptor);
        });
})();