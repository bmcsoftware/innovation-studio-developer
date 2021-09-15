// This code is run at "design" phase, in Innovation Studio.
// The factory is declared in the "config.js".
(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.display-data').factory('comExampleSamplelibraryDisplayDataDesign', function (comExampleSamplelibraryDisplayDataModel, rxGUID, RX_DEFINITION_PICKER) {
        function getRxConfig(componentDefinition, componentDescriptor) {
            return {
                id: componentDefinition.guid || rxGUID.generate(),
                type: componentDefinition.type,
                rxData: getRxData(componentDefinition, componentDescriptor),
                rxInspector: getRxInspector()
            };
        }

        // Getting configuration defined in Innovation Studio parameters.
        // We can also setup default values.
        function getRxData(componentDefinition, componentDescriptor) {

            return {
                recordDefinitionName: componentDefinition.propertiesByName.recordDefinitionName,
                fieldIdToDisplay: componentDefinition.propertiesByName.fieldIdToDisplay,
                fieldLabelToDisplay: componentDefinition.propertiesByName.fieldLabelToDisplay
            };
        }

        // Defining the parameters types with helper.
        function getRxInspector() {
            return {
                inputs: {
                    rxData: {
                        recordDefinitionName: {
                            label: 'Record Definition Name',
                            type: 'rx-inspector-definition-picker', //  special editor for selecting definitions (inspector). This one is an OOTB to pick up a record definition.
                            definitionType: RX_DEFINITION_PICKER.definitionTypes.regularRecord.type, //  define which definition user can select
                            group: 'general',
                            index: 1
                        },
                        fieldIdToDisplay: {
                            label: 'Field ID to display',
                            type: 'rx-inspector-expression-node-field',
                            group: 'general',
                            index: 2
                        },
                        fieldLabelToDisplay: {
                            label: 'Field Label',
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
                return new comExampleSamplelibraryDisplayDataModel(getRxConfig(componentDefinition, componentDescriptor));
            }
        };
    });
})();