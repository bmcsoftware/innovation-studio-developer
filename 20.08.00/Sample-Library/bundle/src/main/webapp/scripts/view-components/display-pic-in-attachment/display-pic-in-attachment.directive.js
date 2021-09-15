(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.display-pic-in-attachment').directive('comExampleSmartSamplelibraryDisplayPicInAttachment',
        function (rxRecordInstanceAttachmentResource) {
            return {
                restrict: 'E',
                templateUrl: 'scripts/view-components/display-pic-in-attachment/com-example-samplelibrary-display-pic-in-attachment.directive.html',

                // rxConfiguration is used to get input parameters:
                scope: {
                    rxConfiguration: '='
                },

                link: function ($scope) {
                    var _config;

                    // Function that gets a record attachment file.
                    var getPicture = function (save_picture) {
                        _config = $scope.rxConfiguration.propertiesByName;
                        $scope.recordDefinitionFullName = _config.recordDefinitionFullName;
                        $scope.fieldId = _config.fieldId;
                        $scope.recordId = _config.recordId;
                        $scope.pictureData = '';
                        $scope.fileName = '';

                        if ($scope.recordDefinitionFullName === '' || $scope.fieldId === '' || $scope.recordId === '') {
                            return;
                        }

                        if (angular.isUndefined($scope.recordDefinitionFullName) || angular.isUndefined($scope.fieldId) || angular.isUndefined($scope.recordId)) {
                            return;
                        }

                        // Getting the attachment using BMC OOTB Javascript APIs
                        var attachmentsResource = rxRecordInstanceAttachmentResource.withName($scope.recordDefinitionFullName);

                        attachmentsResource.get($scope.recordId, ($scope.fieldId).toString()).then(function (fileStream) {
                            if (fileStream) {
                                //  reference: https:// developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array
                                var arrayBufferView = new Uint8Array(fileStream.data); //  eslint-disable-line  no-undef

                                var file = new Blob([arrayBufferView], {
                                    type: fileStream.headers('content-type')
                                });

                                var urlCreator = window.URL || window.webkitURL;
                                $scope.pictureData = urlCreator.createObjectURL(file);
                                debugger;

                                //  function from file-saver.js library
                                if (save_picture) {
                                    $scope.fileName = fileStream.headers('Content-Disposition').split('filename=')[1];
                                    saveAs(file, $scope.fileName); //  eslint-disable-line  no-undef
                                }
                            }
                        });
                    };

                    // Saving the picture.
                    $scope.savePicture = function () {
                        getPicture(true);
                    };

                    // We call the "getPicture" function each time the recordId changes
                    // But we do not want to save the picture.
                    $scope.$watch('rxConfiguration.propertiesByName.recordId', function () {
                        getPicture(false);
                    });
                }
            };
        });
})();