// This directive is used at design time to choose a field.

// Note:
// The chose record definition should have an "attachment" field to be displayed in the list.
(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.display-pic-in-attachment').directive('comExampleSamplelibraryInspectorDisplayPicInAttachmentFieldSelect', function (RX_RECORD_DEFINITION) {
        return {
            restrict: 'E',
            templateUrl: 'scripts/view-components/display-pic-in-attachment/com-example-samplelibrary-inspector-display-pic-in-attachment-field-select.directive.html',

            link: function ($scope) {
                $scope.data = {
                    fields: [],
                    selectedField: null
                };

                init();

                function init() {
                    initializeFields();

                    // reinitialize fields when user change Record Definition
                    $scope.$watch('cell.recordDefinitionFullName', initializeFields);

                    $scope.$watch('data.selectedField', function (newValue) {
                        if (newValue) {
                            // set field id to the model
                            $scope.cell.prop($scope.path, $scope.data.selectedField.id);
                        }
                    }, true);
                }

                function initializeFields() {
                    if ($scope.cell.recordDefinitionFullName) {
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

                // get all attachment fields from the selected Record Definition
                function getFields() {
                    console.log($scope.cell.recordDefinitionFullName.fieldDefinitions);

                    return _($scope.cell.recordDefinitionFullName.fieldDefinitions)
                        .filter({
                            // Only the field of type "attachment" will be returned in the list.
                            resourceType: RX_RECORD_DEFINITION.dataTypes.attachment.resourceType
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