/*
This code is run at "design" phase, in Innovation Studio.
The factory is defined in the "config.js":
designManagerService: 'comExampleSamplelibraryStarRatingDesign',
*/
(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.star-rating').factory('comExampleSamplelibraryStarRatingDesign', function (comExampleSamplelibraryStarRatingModel, rxGUID, RX_DEFINITION_PICKER) {
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
            var defaultStarCount = _.find(componentDescriptor.propertiesByName, {
                name: 'stars'
            }).defaultValue;

            return {
                recordDefinitionName: componentDefinition.propertiesByName.recordDefinitionName,
                recordInstanceId: componentDefinition.propertiesByName.recordInstanceId,
                fieldId: componentDefinition.propertiesByName.fieldId,
                stars: componentDefinition.propertiesByName.stars || Number(defaultStarCount)
            };
        }

        // Defining the parameters types with helper.
        function getRxInspector() {
            return {
                inputs: {
                    rxData: {
                        recordDefinitionName: {
                            label: 'Record Definition Name',
                            type: 'rx-inspector-definition-picker', //  special editor for selecting definitions
                            definitionType: RX_DEFINITION_PICKER.definitionTypes.regularRecord.type, //  define which definition user can select
                            group: 'general',
                            index: 1
                        },
                        recordInstanceId: {
                            label: 'Record Instance ID',
                            type: 'rx-inspector-expression-node-field',
                            group: 'general',
                            index: 2
                        },
                        fieldId: {
                            label: 'Field Id (Integer Type)',
                            // Type defined in "inspector-star-rating-field-select-directive.js"
                            // directive('comExampleSamplelibraryInspectorStarRatingFieldSelect')
                            type: 'com-example-samplelibrary-inspector-star-rating-field-select', //  set our directive as editor
                            group: 'general',
                            index: 3
                        },
                        stars: {
                            label: 'Stars',
                            type: 'number',     //  set number as editor for stars
                            min: 5, //  minimal value
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
            // should return a model instance
            getModel: function (componentDefinition, componentDescriptor) {
                return new comExampleSamplelibraryStarRatingModel(getRxConfig(componentDefinition, componentDescriptor));
            }
        };
    });
})();