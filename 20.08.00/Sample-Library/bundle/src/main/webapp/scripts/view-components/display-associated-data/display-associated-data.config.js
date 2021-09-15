(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.display-associated-data')
        .config(function (rxViewComponentProvider) {
            var starRatingDescriptor = {
                name: 'Display Associated Data with Js',
                group: 'Sample Library Components',
                icon: 'storage_database',
                type: 'com-example-samplelibrary-display-associated-data',  // the name of runtime directive
                designType: 'com-example-samplelibrary-display-associated-data-design', // register design directive
                bundleId: 'com.example.samplelibrary',

                // define component properties
                propertiesByName: [
                    {
                        name: 'fieldIdToDisplay',
                        isConfig: true,
                        type: "string",
                        isRequired: true
                    },
                    {
                        name: 'fieldLabelToDisplay',
                        isConfig: true,
                        type: "string",
                        isRequired: true
                    },
                    {
                        name: 'recordInstanceId',
                        isConfig: true,
                        isRequired: true,
                        enableExpressionEvaluation: true    //  the property will be automatically evaluated at runtime and passed to the runtime directive
                    },
                    {
                        name: 'AssociationName',
                        isConfig: true,
                        isRequired: true,
                        enableExpressionEvaluation: false    //  the property will be not be automatically evaluated at runtime and passed to the runtime directive
                    }
                ]
            };

            rxViewComponentProvider.registerComponent(starRatingDescriptor);
        });
})();