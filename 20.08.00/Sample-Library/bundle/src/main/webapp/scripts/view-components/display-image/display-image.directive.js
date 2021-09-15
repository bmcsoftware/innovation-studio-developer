(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.display-image').directive('comExampleSamplelibraryDisplayImage',
        function (rxRecordInstanceAttachmentResource) {
            return {
                restrict: 'E',
                templateUrl: 'scripts/view-components/display-image/com-example-samplelibrary-display-image.directive.html',

                scope: {
                    rxConfiguration: '='
                },

                link: function ($scope) {
                    // Fetching an image stored in an attachment field using BMC OOTB Javascript APIs
                    var fetchPicture = function () {
                        var _configuration = $scope.rxConfiguration.propertiesByName,
                            maxWidth = _configuration.maxWidth || '150px';

                        $scope.pictureData = '';

                        $scope.cssStyle = {
                            'max-width': maxWidth,
                            width: 'auto',
                            height: 'auto',
                            display: 'block',
                            'margin-left': 'auto',
                            'margin-right': 'auto'
                        };

                        if (_configuration.recordDefinitionName && _configuration.recordInstanceId && _configuration.fieldId) {
                            var attachmentsResource = rxRecordInstanceAttachmentResource.withName(_configuration.recordDefinitionName);

                            attachmentsResource.get(_configuration.recordInstanceId, (_configuration.fieldId).toString())
                                .then(function (attachmentContent) {
                                    // Creating an image object, reference:
                                    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array
                                    if (attachmentContent) {
                                        if (attachmentContent.headers('content-type') && attachmentContent.headers('content-type').split('/')[0].toLowerCase() === 'image') {
                                            var arrayBufferView = new Uint8Array(attachmentContent.data),
                                                urlCreator = window.URL || window.webkitURL;

                                            var file = new Blob([arrayBufferView], {
                                                type: attachmentContent.headers('content-type')
                                            });

                                            $scope.pictureData = urlCreator.createObjectURL(file);
                                        } else {
                                            $scope.pictureData = '';
                                        }
                                    }
                                });
                        }
                    };

                    $scope.$watch('rxConfiguration.propertiesByName.recordInstanceId', fetchPicture);
                }
            };
        });
})();