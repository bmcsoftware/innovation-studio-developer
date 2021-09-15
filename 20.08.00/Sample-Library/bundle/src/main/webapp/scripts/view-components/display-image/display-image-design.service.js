(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.display-image')
        .factory('comExampleSamplelibraryDisplayImageDesignManager', function (comExampleSamplelibraryDisplayImageModel,
                                                                               rxGUID,
                                                                               RX_DEFINITION_PICKER) {
            function getRxConfig(componentDefinition, componentDescriptor) {
                return {
                    id: componentDefinition.guid || rxGUID.generate(),
                    type: componentDefinition.type,
                    rxData: getRxData(componentDefinition, componentDescriptor),
                    rxInspector: getRxInspector()
                };
            }

            function getRxData(componentDefinition, componentDescriptor) {
                return {
                    recordDefinitionName: componentDefinition.propertiesByName.recordDefinitionName,
                    fieldId: componentDefinition.propertiesByName.fieldId,
                    recordInstanceId: componentDefinition.propertiesByName.recordInstanceId,
                    maxWidth: componentDefinition.propertiesByName.maxWidth
                };
            }

            function getRxInspector() {
                return {
                    inputs: {
                        rxData: {
                            recordDefinitionName: {
                                label: 'Record Definition Name',
                                type: 'rx-inspector-definition-picker',
                                definitionType: RX_DEFINITION_PICKER.definitionTypes.regularRecord.type,
                                group: 'general',
                                index: 1
                            },
                            fieldId: {
                                label: 'Attachment Field',
                                type: 'com-example-samplelibrary-attachment-field-selector',
                                group: 'general',
                                index: 2
                            },
                            recordInstanceId: {
                                label: 'Record Instance Id',
                                type: 'rx-inspector-expression-node-field',
                                group: 'general',
                                index: 3
                            },
                            maxWidth: {
                                label: 'Picture Max Width (px or %)',
                                type: 'rx-inspector-expression-node-field',
                                group: 'general',
                                index: 4
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
                getModel: function (componentDefinition, componentDescriptor) {
                    return new comExampleSamplelibraryDisplayImageModel(getRxConfig(componentDefinition, componentDescriptor));
                }
            };
        });
})();