(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.display-image').config(function (rxViewComponentProvider) {
        rxViewComponentProvider.registerComponent([
            {
                name: 'Display Image',
                group: 'Sample Library',
                icon: 'image_square',
                type: 'com-example-samplelibrary-display-image',
                designType: 'com-example-samplelibrary-display-image-design',
                bundleId: 'com.example.samplelibrary',
                designManagerService: 'comExampleSamplelibraryDisplayImageDesignManager',
                canBeEmbeddedInRecordEditor: true,
                propertiesByName: [
                    {
                        name: 'recordDefinitionName',
                        type: 'string',
                        isConfig: true,
                        isProperty: false,
                        enableExpressionEvaluation: false
                    },
                    {
                        name: 'fieldId',
                        type: 'string',
                        isConfig: true,
                        isProperty: false,
                        enableExpressionEvaluation: true
                    },
                    {
                        name: 'recordInstanceId',
                        type: 'string',
                        isConfig: true,
                        isProperty: false,
                        enableExpressionEvaluation: true
                    }
                    ,
                    {
                        name: 'maxWidth',
                        type: 'string',
                        isConfig: true,
                        isProperty: false,
                        enableExpressionEvaluation: true
                    }
                ]
            }
        ]);
    });
})();