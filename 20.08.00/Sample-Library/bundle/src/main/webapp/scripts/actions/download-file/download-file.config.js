(function () {
    'use strict';

    angular.module('com.example.samplelibrary.actions.download-file').config(function (rxActionProvider,
                                                                                       RX_DEFINITION_PICKER) {
        rxActionProvider.registerAction({
            name: 'comExampleSamplelibraryDownloadFile',
            label: 'Download File',
            bundleId: 'com.example.samplelibrary',
            parameters: [
                {
                    name: 'recordDefinitionName',
                    label: 'Record Definition',
                    editor: 'rx-action-definition-picker',
                    definitionType: RX_DEFINITION_PICKER.definitionTypes.dataRecord.type,
                    defaultValue: null
                },
                {
                    name: 'attachmentField',
                    label: 'Attachment Field',
                    // This is a custom editor that will list the attachments fields from
                    // the selected record definition.
                    editor: 'download-file-attachment-field-picker',
                    enableExpressionEvaluation: true
                },
                {
                    name: 'recordInstanceId',
                    label: 'Record Instance Id',
                    enableExpressionEvaluation: true
                }
            ]
        });
    });
})();