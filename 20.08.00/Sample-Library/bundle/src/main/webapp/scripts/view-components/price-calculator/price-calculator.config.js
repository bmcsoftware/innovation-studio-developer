(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.price-calculator')
        .config(function (rxViewComponentProvider) {
            rxViewComponentProvider.registerComponent([
                {
                    name: 'Price Calculator',
                    group: 'Sample Library Components',
                    icon: 'tag_dollar',
                    type: 'com-example-samplelibrary-price-calculator',
                    designType: 'com-example-samplelibrary-price-calculator-design',
                    bundleId: 'com.example.samplelibrary',
                    propertiesByName: [
                        {
                            name: 'price',
                            type: 'string',
                            isConfig: true, // means input parameter
                            enableExpressionEvaluation: true
                        },
                        {
                            name: 'vat',
                            type: 'string',
                            isConfig: true,
                            enableExpressionEvaluation: true
                        },
                        {
                            name: 'priceWithVat',
                            type: 'string',
                            isConfig: false,    //  Will not appear as an input parameter
                            isProperty: true    //  An output parameter
                        }
                    ]
                }
            ]);
        });
})();