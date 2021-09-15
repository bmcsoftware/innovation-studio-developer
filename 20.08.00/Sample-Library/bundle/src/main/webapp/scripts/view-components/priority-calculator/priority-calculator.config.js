(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.priority-calculator').config(function (rxViewComponentProvider) {
        rxViewComponentProvider.registerComponent([
            {
                name: 'Priority Calculator',
                group: 'Sample Library Components',
                icon: 'number_square_five',
                type: 'com-example-samplelibrary-priority-calculator',
                designType: 'com-example-samplelibrary-priority-calculator-design',
                bundleId: 'com.example.samplelibrary',
                propertiesByName: [
                    {
                        name: 'urgency',
                        type: 'int',
                        isConfig: true, // Means input parameter
                        isProperty: false,  // Means can be output parameter
                        enableExpressionEvaluation: true
                    },
                    {
                        name: 'impact',
                        type: 'int',
                        isConfig: true,
                        isProperty: false,
                        enableExpressionEvaluation: true
                    },
                    {
                        name: 'priority',
                        type: 'int',
                        isConfig: false,
                        isProperty: true,
                        enableExpressionEvaluation: false
                    }
                ]
            }
        ]);
    });
})();