(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.nvd3-chart')
        .factory('comExampleSamplelibraryNvd3ChartDesignManager', function (comExampleSamplelibraryNvd3ChartModel,
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
                    title: componentDefinition.propertiesByName.title,
                    color: componentDefinition.propertiesByName.color,
                    groupByFieldID: componentDefinition.propertiesByName.groupByFieldID,
                    parentInstanceID: componentDefinition.propertiesByName.parentInstanceID,
                    AssociationName: componentDefinition.propertiesByName.AssociationName,
                    node: componentDefinition.propertiesByName.node
                };
            }

            function getRxInspector() {
                return {
                    inputs: {
                        rxData: {
                            title: {
                                label: 'Title',
                                type: 'rx-inspector-expression-node-field',
                                group: 'general',
                                index: 1
                            },
                            recordDefinitionName: {
                                label: 'Record Definition Name',
                                type: 'rx-inspector-definition-picker',
                                definitionType: RX_DEFINITION_PICKER.definitionTypes.regularRecord.type,
                                group: 'general',
                                index: 2
                            },
                            color: {
                                label: 'Color',
                                type: 'com-example-samplelibrary-nvd3-chart-picker',
                                group: 'general',
                                index: 3
                            },
                            groupByFieldID: {
                                label: 'group By Field Id',
                                type: 'rx-inspector-expression-node-field',
                                group: 'general',
                                index: 4
                            },
                            AssociationName: {
                                label: 'Association Name (optional)',
                                type: 'rx-inspector-expression-node-field',
                                group: 'association',
                                index: 5
                            },
                            parentInstanceID: {
                                label: 'parent Instance ID (optional)',
                                type: 'rx-inspector-expression-node-field',
                                group: 'association',
                                index: 6
                            },
                            node: {
                                label: 'node (optional: nodeA, nodeB)',
                                type: 'rx-inspector-expression-node-field',
                                group: 'association',
                                index: 7
                            }
                        }
                    },
                    groups: {
                        general: {
                            label: 'General',
                            index: 1
                        },
                        association: {
                            label: 'Association',
                            index: 2
                        }
                    }
                };
            }

            return {
                getModel: function (componentDefinition, componentDescriptor) {
                    return new comExampleSamplelibraryNvd3ChartModel(getRxConfig(componentDefinition, componentDescriptor));
                }
            };
        });
})();
