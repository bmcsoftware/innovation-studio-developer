// This code is run at "design" phase, in Innovation Studio.
// The factory is defined in the "config.js".
(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.display-pic-in-attachment').factory('comExampleSamplelibraryDisplayPicInAttachmentDesign', function (comExampleSamplelibraryDisplayPicInAttachmentModel, rxGUID, RX_DEFINITION_PICKER) {
        function getRxConfig(componentDefinition, componentDescriptor) {
            return {
                id: componentDefinition.guid || rxGUID.generate(),
                type: componentDefinition.type,
                rxData: getRxData(componentDefinition, componentDescriptor),
                rxInspector: getRxInspector()
            };
        }

        // Getting configuration defined in Innovation Studio parameters.
        function getRxData(componentDefinition, componentDescriptor) {
            return {
                recordDefinitionFullName: componentDefinition.propertiesByName.recordDefinitionFullName,
                fieldId: componentDefinition.propertiesByName.fieldId,
                recordId: componentDefinition.propertiesByName.recordId
            };
        }

        // Defining the parameters types with helper.
        function getRxInspector() {
            return {
                inputs: {
                    rxData: {
                        recordDefinitionFullName: {
                            label: 'Record Definition Name',
                            type: 'rx-inspector-definition-picker', //  special editor for selecting definitions
                            definitionType: RX_DEFINITION_PICKER.definitionTypes.regularRecord.type, //  define which definition user can select
                            group: 'general',
                            index: 1
                        },
                        fieldId: {
                            label: 'Field Id (Attachment Type)',
                            type: 'com-example-samplelibrary-inspector-display-pic-in-attachment-field-select', //  set our directive as editor
                            group: 'general',
                            index: 2
                        },
                        recordId: {
                            label: 'Record Instance ID',
                            type: 'rx-inspector-expression-node-field',
                            group: 'general',
                            index: 3
                        }
                    }
                },
                groups: {
                    general: {
                        label: 'General',
                        index: 1
                    }
                }
            };
        }

        return {
            //  should return a model instance
            getModel: function (componentDefinition, componentDescriptor) {
                return new comExampleSamplelibraryDisplayPicInAttachmentModel(getRxConfig(componentDefinition, componentDescriptor));
            }
        };
    });
})();