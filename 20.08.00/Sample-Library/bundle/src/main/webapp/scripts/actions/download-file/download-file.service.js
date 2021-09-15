(function () {
    'use strict';

    angular.module('com.example.samplelibrary.actions.download-file').service('comExampleSamplelibraryDownloadFile', function ($q,
                                                                                                                               rxNotificationMessage,
                                                                                                                               rxRecordInstanceAttachmentResource) {
            return {
                // code executed at runtime.
                execute: function (recordDefinitionName, attachmentField, recordInstanceId) {
                    var attachmentsResource = rxRecordInstanceAttachmentResource.withName(recordDefinitionName);

                    rxNotificationMessage.info('Please wait while attachment is fetched.');

                    return attachmentsResource.get(recordInstanceId, (attachmentField).toString())
                        .then(function (fileStream) {
                        if (fileStream) {
                            var arrayBufferView = new Uint8Array(fileStream.data),
                                attachmentFileName = _.last(fileStream.headers('Content-Disposition').split('filename='));

                            if (attachmentFileName) {
                                attachmentFileName = attachmentFileName.replace(/"/g, '');
                            }

                            var file = new Blob([arrayBufferView], {
                                type: fileStream.headers('content-type')
                            });

                            saveAs(file, attachmentFileName);
                        } else {
                            rxNotificationMessage.info('No attachment has been found.');
                        }

                        return {ActionResult: 'ok'};
                    })
                        .catch(function() {
                            // Error downloading the file
                            return $q.reject();
                    });
                },
                // Declaring the output parameter. It will be available to the next actions as "available values / actions"
                getOutputParams: function () {
                    return $q.when([
                        {name: 'ActionResult'}
                    ]);
                }
            }
        }
    )
})();
