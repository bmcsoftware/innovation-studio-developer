(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.display-pic-in-attachment').config(function (rxViewComponentProvider) {
        rxViewComponentProvider.registerComponent([
            {
                name: 'Display picture from Attachment',
                group: 'Sample Library Components',
                icon: 'image_square',
                type: 'com-example-smart-samplelibrary-display-pic-in-attachment',
                designType: 'com-example-samplelibrary-display-pic-in-attachment-design',
                bundleId: 'com.example.samplelibrary',
                designManagerService: 'comExampleSamplelibraryDisplayPicInAttachmentDesign',
                propertiesByName: [
                    {
                        name: 'recordDefinitionFullName',
                        type: 'string',
                        isConfig: true,
                        isProperty: false
                    },
                    {
                        name: 'fieldId',
                        type: 'string',
                        isConfig: true,
                        isProperty: false,
                        enableExpressionEvaluation: true
                    },
                    {
                        name: 'recordId',
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