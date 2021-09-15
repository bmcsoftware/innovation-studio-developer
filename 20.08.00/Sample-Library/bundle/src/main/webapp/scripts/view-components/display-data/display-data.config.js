(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.display-data')
        .config(function (rxViewComponentProvider) {
            var starRatingDescriptor = {
                name: 'Display Data using Javascript',
                group: 'Sample Library Components',
                icon: 'database_o',
                type: 'com-example-samplelibrary-display-data',  // the name of runtime directive
                designType: 'com-example-samplelibrary-display-data-design', // register design directive
                designManagerService: 'comExampleSamplelibraryDisplayDataDesign',
                bundleId: 'com.example.samplelibrary',

                // define component input parameters
                propertiesByName: [
                    {
                        name: 'recordDefinitionName',
                        isConfig: true,
                        type: "string",
                        isRequired: true
                    },
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
                    }
                ]
            };

            rxViewComponentProvider.registerComponent(starRatingDescriptor);
        });
})();