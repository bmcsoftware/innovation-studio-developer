(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.nvd3-chart').config(function (rxViewComponentProvider) {
        rxViewComponentProvider.registerComponent([
            {
                name: 'NvD3 Pie Chart',
                group: 'Sample Library',
                icon: 'chart_bar',
                type: 'com-example-samplelibrary-nvd3-chart',
                designType: 'com-example-samplelibrary-nvd3-chart-design',
                bundleId: 'com.example.samplelibrary',
                designManagerService: 'comExampleSamplelibraryNvd3ChartDesignManager',
                canBeEmbeddedInRecordEditor: true,
                propertiesByName: [
                    {
                        name: 'title',
                        type: 'string',
                        isConfig: true,
                        enableExpressionEvaluation: true
                    },
                    {
                        name: 'color',
                        type: 'string',
                        isConfig: true
                    },
                    {
                        name: 'recordDefinitionName',
                        type: 'string',
                        isConfig: true
                    },
                    {
                        name: 'groupByFieldID',
                        type: 'string',
                        isConfig: true,
                        enableExpressionEvaluation: true
                    },
                    {
                        name: 'parentInstanceID',
                        type: 'string',
                        isConfig: true,
                        enableExpressionEvaluation: true
                    },
                    {
                        name: 'AssociationName',
                        type: 'string',
                        isConfig: true,
                        enableExpressionEvaluation: true
                    },
                    {
                        name: 'node',
                        type: 'string',
                        isConfig: true,
                        enableExpressionEvaluation: true
                    },
                    {
                        // You need at least one Output variable to have a custom
                        // refresh method, even if this is not used later in the code.
                        name: 'testFlag',
                        type: 'string',
                        isProperty: true,
                        enableExpressionEvaluation: true
                    }
                ]
            }
        ]);
    });
})();
