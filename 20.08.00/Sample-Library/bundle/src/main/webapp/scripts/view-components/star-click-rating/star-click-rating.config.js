(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.star-click-rating')
        .config(function (rxViewComponentProvider) {
            var starRatingClickDescriptor = {
                name: 'Star Rating - Click',
                group: 'Sample Library Components',
                icon: 'star',
                type: 'com-example-samplelibrary-star-click-rating',  // the name of runtime directive
                designType: 'com-example-samplelibrary-star-click-rating-design', // register design directive
                designManagerService: 'comExampleSamplelibraryStarClickRatingDesign',
                bundleId: 'com.example.samplelibrary',
                canBeEmbeddedInRecordEditor: true,

                // define component properties
                propertiesByName: [
                    {
                        name: 'mappingStarValue',
                        isConfig: true,
                        isRequired: true,
                        enableExpressionEvaluation: true
                    },
                    {
                        name: 'maxAmountOfStars',
                        isConfig: true,
                        isRequired: true,
                        defaultValue: "5"
                    },
                    {
                        name: 'defaultValueStars',
                        isConfig: true,
                        isRequired: true,
                        defaultValue: "2"
                    },
                    {
                        name: 'colorStarsSelected',
                        isConfig: true,
                        isRequired: true,
                        defaultValue: '#ff9805'
                    },
                    {
                        name: 'colorStarsNotSelected',
                        isConfig: true,
                        isRequired: true,
                        defaultValue: '#000000'
                    },
                    {
                        name: 'selectedStarValue',
                        isProperty: true        //Output parameter
                    }
                ]
            };

            rxViewComponentProvider.registerComponent(starRatingClickDescriptor);
        });
})();