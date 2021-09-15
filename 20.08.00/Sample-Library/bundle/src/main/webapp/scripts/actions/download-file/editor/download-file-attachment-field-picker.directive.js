(function () {
    'use strict';

    angular.module('com.bmc.arsys.rx.standardlib.view-components.action-button').directive('downloadFileAttachmentFieldPicker', function (rxActionPropertyNavigator,
                                                                                                                                          rxDesignerCache,
                                                                                                                                          RX_RECORD_DEFINITION) {
        return {
            templateUrl: 'scripts/actions/download-file/editor/download-file-attachment-field-picker.template.html',

            controller: function ($scope) {
                // We get the value of the chosen record definition
                var recordDefinitionNamePath = 'rxData/recordDefinitionName',
                    recordDefinitionName = $scope.cell.prop(recordDefinitionNamePath),
                    // We get the value of the attachment field (if any)
                    attachmentFieldPath = $scope.path,
                    attachmentField = $scope.cell.prop(attachmentFieldPath);

                $scope.data = {
                    fields: [],
                    selectedField: null
                };

                getAttachmentFieldList(recordDefinitionName);

                // Called when we select an attachment field
                $scope.$watch('data.selectedField', function (newValue) {
                    if (newValue) {
                        // set field id to the model
                        $scope.cell.prop(attachmentFieldPath, $scope.data.selectedField.id);
                    }
                }, true);

                // We get the list of attachment fields for this record definition, if any
                function getAttachmentFieldList(recordDefinitionName) {
                    if (recordDefinitionName) {
                        // rxDesigner cache object allows us to get a record Definition from cache
                        // or server if not cached beforehand.
                        rxDesignerCache.getRecordDefinition(recordDefinitionName)
                            .then(function (recordDefinition) {
                                $scope.data.fields = _(recordDefinition.fieldDefinitions)
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

                                // We check if the saved attachment field exists in the record definition
                                $scope.data.selectedField = _.find($scope.data.fields, {
                                    id: Number(attachmentField)
                                });
                            });
                    } else {
                        $scope.data.fields = [];
                        $scope.data.selectedField = null;
                    }
                }

                // If no record definition name is selected we reset all values.
                function resetFieldSelection() {
                    $scope.inputParams = [];
                    attachmentField = null;

                    if ($scope.cell.prop(attachmentFieldPath)) {
                        $scope.cell.prop(attachmentFieldPath, attachmentField, {silent: true});
                    }
                }

                // Reacts to event, here we monitor the change on the record definition name
                $scope.cell.on('change', function (cell, options) {
                    if (options.propertyPath === recordDefinitionNamePath) {
                        recordDefinitionName = $scope.cell.prop(recordDefinitionNamePath);

                        if (recordDefinitionName) {
                            getAttachmentFieldList(recordDefinitionName);
                        } else {
                            resetFieldSelection();
                        }
                    }
                });
            }
        };
    });
})();