/**
 * This example is based on this question on BMC Communities:
 * https://communities.bmc.com/thread/207217
 *
 * It is using the qrcode reader module provided by zxing qr code reader 'https://github.com/zxing-js/'.
 * Example is coming from:
 * https://unpkg.com/@zxing/library@latest
 * https://stackoverflow.com/questions/62034678/how-can-i-scan-a-qr-code-from-a-webcam-using-zxing-in-js
 */
(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.qrcode-reader').directive('comExampleSamplelibraryQrcodeReader',
        function ($document,
                  $timeout,
                  rxGUID,
                  rxViewComponentEventManager) {
            return {
                restrict: 'E',
                templateUrl: 'scripts/view-components/qrcode-reader/com-example-samplelibrary-qrcode-reader.directive.html',

                scope: {
                    rxConfiguration: '='
                },

                link: function ($scope) {
                    // rxViewComponentEventManager is used to broadcast a parameter to other view components
                    var eventManager = rxViewComponentEventManager.getInstance($scope),
                        codeReader = new ZXing.BrowserQRCodeReader(),
                        previousQrCode;

                    // We are generating a dynamic id in case we put several webcam fields in a single view
                    // or it collides with another field Id.
                    // We are using rxGuid to generate a guid, beginning by 'webcam_id' string.
                    $scope.webcamFieldId = 'webcam_id_' + rxGUID.generate('qrcode');

                    // We wait for the webcam fieldId to be available in the DOM.
                    function initializeQrCodeVideoDecoder() {
                        if (!_.first($document.find('#' + $scope.webcamFieldId))) {
                            $timeout(initializeQrCodeVideoDecoder, 500);
                        } else {
                            codeReader.decodeFromVideoDevice(null, $scope.webcamFieldId, function (result, error) {
                                if (result) {
                                    // Properly decoded qr code.
                                    if (previousQrCode !== result.text) {
                                        console.log('Found QR code!', result)
                                        previousQrCode = result.text;

                                        // Make the QR Code available to other view components.
                                        eventManager.propertyChanged({
                                            property: 'QrCode',
                                            oldValue: null,
                                            newValue: result.text
                                        });

                                        // This is done to refresh the display.
                                        $scope.$apply();
                                    }
                                }

                                // Commented out to avoid too many messages in the console log.
                                if (error) {
                                    // As long as this error belongs into one of the following categories
                                    // the code reader is going to continue as excepted. Any other error
                                    // will stop the decoding loop.
                                    //
                                    // Excepted Exceptions:
                                    //
                                    //  - NotFoundException
                                    //  - ChecksumException
                                    //  - FormatException
                                    if (error instanceof ZXing.NotFoundException) {
                                        // console.log('No QR code found.')
                                    }

                                    if (error instanceof ZXing.ChecksumException) {
                                        // console.log('A code was found, but it does not seem valid.')
                                    }

                                    if (error instanceof ZXing.FormatException) {
                                        // console.log('A code was found, but it was in an invalid format.')
                                    }
                                }
                            })
                        }
                    }

                    initializeQrCodeVideoDecoder()
                }
            };
        });
})();
