/*
This directive is used at design time to choose a field.
It is used in "star-rating-design.service.js".

Note:
The chosen record definition should have an "int" field to be displayed in the list.
*/
(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.star-rating').directive('comExampleSamplelibraryInspectorStarRatingFieldSelect', function (RX_RECORD_DEFINITION) {
        return {
            restrict: 'E',
            templateUrl: 'scripts/view-components/star-rating/com-example-samplelibrary-inspector-star-rating-field-select.directive.html',

            link: function ($scope) {
                $scope.data = {
                    fields: [],
                    selectedField: null
                };

                init();

                function init() {
                    initializeFields();

                    // reinitialize fields when user change Record Definition
                    $scope.$watch('cell.recordDefinition', initializeFields);

                    $scope.$watch('data.selectedField', function (newValue) {
                        if (newValue) {
                            // set field id to the model
                            $scope.cell.prop($scope.path, $scope.data.selectedField.id);
                        }
                    }, true);
                }

                function initializeFields() {
                    if ($scope.cell.recordDefinition) {
                        $scope.data.fields = getFields();
                        console.log("getFields=" + $scope.data.fields);

                        $scope.data.selectedField = _.find($scope.data.fields, {
                            id: Number($scope.cell.prop($scope.path))
                        });
                    } else {
                        $scope.data.fields = [];
                        $scope.data.selectedField = null;
                    }
                }

                // get all integer fields from the selected Record Definition
                function getFields() {
                    console.log($scope.cell.recordDefinition.fieldDefinitions);

                    return _($scope.cell.recordDefinition.fieldDefinitions)
                        .filter({
                            // Only the field of type "integer" will be returned in the list.
                            resourceType: RX_RECORD_DEFINITION.dataTypes.integer.resourceType
                        })
                        .map(function (fieldDefinition) {
                            return {
                                id: fieldDefinition.id,
                                name: fieldDefinition.name
                            };
                        })
                        .value();
                }
            }
        };
    });
})();