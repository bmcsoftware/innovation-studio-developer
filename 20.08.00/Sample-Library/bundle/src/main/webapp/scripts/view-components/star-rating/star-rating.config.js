(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.star-rating')
        .config(function (rxViewComponentProvider) {
            var starRatingDescriptor = {
                name: 'Star Rating',
                group: 'Sample Library Components',
                icon: 'star',
                type: 'com-example-samplelibrary-star-rating',  // the name of runtime directive
                designType: 'com-example-samplelibrary-star-rating-design', // register design directive
                designManagerService: 'comExampleSamplelibraryStarRatingDesign',
                bundleId: 'com.example.samplelibrary',

                // define component properties
                propertiesByName: [
                    {
                        name: 'recordDefinitionName',
                        isConfig: true,
                        isRequired: true
                    },
                    {
                        name: 'recordInstanceId',
                        isConfig: true,
                        isRequired: true,
                        enableExpressionEvaluation: true    //  the property will be automatically evaluated at runtime and passed to the runtime directive
                    },
                    {
                        name: 'fieldId',
                        isConfig: true,
                        isRequired: true
                    },
                    {
                        name: 'stars',
                        isConfig: true,
                        isProperty: true,    // property will be available for building expressions
                        isRequired: true,
                        defaultValue: '5'
                    }
                ]
            };

            rxViewComponentProvider.registerComponent(starRatingDescriptor);
        });
})();