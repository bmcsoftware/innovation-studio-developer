/* This code is run at 'design' phase, in Innovation Studio.
The factory is defined in the 'config.js':
*/
(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.star-click-rating').factory('comExampleSamplelibraryStarClickRatingDesign', function (comExampleSamplelibraryStarClickRatingModel, rxGUID, RX_DEFINITION_PICKER) {
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
            var defaultMaxAmountOfStars = _.find(componentDescriptor.propertiesByName, {
                name: 'maxAmountOfStars'
            }).defaultValue;

            var defaultDefaultValueStars = _.find(componentDescriptor.propertiesByName, {
                name: 'defaultValueStars'
            }).defaultValue;

            var defaultColorStarsSelected = _.find(componentDescriptor.propertiesByName, {
                name: 'colorStarsSelected'
            }).defaultValue;

            var defaultColorStarsNotSelected = _.find(componentDescriptor.propertiesByName, {
                name: 'colorStarsNotSelected'
            }).defaultValue;

            return {
                mappingStarValue: componentDefinition.propertiesByName.mappingStarValue,
                maxAmountOfStars: componentDefinition.propertiesByName.maxAmountOfStars || defaultMaxAmountOfStars,
                defaultValueStars: componentDefinition.propertiesByName.defaultValueStars || defaultDefaultValueStars,
                colorStarsSelected: componentDefinition.propertiesByName.colorStarsSelected || defaultColorStarsSelected,
                colorStarsNotSelected: componentDefinition.propertiesByName.colorStarsNotSelected || defaultColorStarsNotSelected
            };
        }

        // Defining the parameters types with helper.
        // We "overwrite" the options from the config.js files with those ones.
        function getRxInspector() {
            return {
                inputs: {
                    rxData: {
                        mappingStarValue: {
                            label: 'Number of Stars Selected (input)',
                            type: 'rx-inspector-expression-node-field', // Standard Inspector
                            group: 'general',
                            index: 1
                        },
                        maxAmountOfStars: {
                            label: 'Maximum number of stars to display',
                            type: 'com-example-samplelibrary-inspector-star-click-rating-slider-select', // Custom inspector 'comExampleSamplelibraryInspectorStarClickRatingSliderSelect'.
                            group: 'general',
                            index: 2
                        },
                        defaultValueStars: {
                            label: 'Default amount of stars selected',
                            type: 'com-example-samplelibrary-inspector-star-click-rating-default-value', // Custom inspector 'comExampleSamplelibraryInspectorStarClickRatingDefaultValue'.
                            group: 'general',
                            index: 3
                        },
                        colorStarsSelected: {
                            label: 'Color of stars selected',
                            type: 'com-example-samplelibrary-inspector-star-click-rating-color-picker-select', // Custom inspector 'comExampleSamplelibraryInspectorStarClickRatingColorPickerSelect'
                            group: 'general',
                            index: 4
                        },
                        colorStarsNotSelected: {
                            label: 'Color of stars not selected',
                            type: 'com-example-samplelibrary-inspector-star-click-rating-color-picker-select',  // Custom inspector 'comExampleSamplelibraryInspectorStarClickRatingColorPickerSelect'
                            group: 'general',
                            index: 5
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
                return new comExampleSamplelibraryStarClickRatingModel(getRxConfig(componentDefinition, componentDescriptor));
            }
        };
    });
})();