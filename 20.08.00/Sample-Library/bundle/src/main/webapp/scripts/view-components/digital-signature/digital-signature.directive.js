/*
This implementation is a POC using those resources :)
-> signature_pad: https://github.com/szimek/signature_pad
bundle/src/main/webapp/lib/signature_pad-2.3.2/signature_pad.min.js
-> angular-signature: (AngularJs wrapper for signature_pad) https://github.com/legalthings/angular-signature
bundle/src/main/webapp/lib/angular-signature/signature.js
-> This thread: https://stackoverflow.com/questions/25813186/digital-signature-with-angularjs
*/
(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.digital-signature').directive('comExampleSamplelibraryDigitalSignature',
        function (rxLog,
                  rxViewComponentEventManager,
                  COM_EXAMPLE_SAMPLE_LIBRARY_DIGITAL_SIGNATURE) {
            return {
                restrict: 'E',
                templateUrl: 'scripts/view-components/digital-signature/com-example-samplelibrary-digital-signature.directive.html',

                scope: {
                    rxConfiguration: '='
                },

                link: function ($scope) {
                    var _config = $scope.rxConfiguration.propertiesByName,
                        eventManager = rxViewComponentEventManager.getInstance($scope),
                        commandTypes = COM_EXAMPLE_SAMPLE_LIBRARY_DIGITAL_SIGNATURE.commandTypes;

                    // Do not put 'px' in the size
                    $scope.width = clearSizePx(_config.width) || '700';
                    $scope.height = clearSizePx(_config.height) || '500';
                    $scope.customCss = _config.customCss || {};

                    // Removing the px or % from size
                    function clearSizePx (size) {
                        return _.isString(size) ? size.replace(/px/gi, '') : size;
                    }

                    function executeSignatureCommand () {
                        var command = $scope.rxConfiguration.propertiesByName.command;

                        if (command) {
                            switch (command) {
                                case commandTypes.getSignature:
                                    $scope.validateSignature();
                                    break;
                                case commandTypes.clearSignature:
                                    $scope.resetSignature();
                                    break;
                                default:
                                    rxLog.debug('The digital signature component does not support the command ' + command + '.');
                            }

                            // Resetting the command
                            $scope.rxConfiguration.propertiesByName.command = '';
                        }
                    }

                    $scope.validateSignature = function () {
                        // We get the Signature object.
                        // The acceptSignature() method has been declared in the directive parameters:
                        // <signature-pad accept="acceptSignature"
                        // The signature comes as a png, encoded in base64.
                        var signatureObject = $scope.acceptSignature(),
                            signatureBase64Picture = _.get(signatureObject, 'dataUrl');

                        if (signatureBase64Picture) {
                            sendSignature(signatureBase64Picture);
                        }
                    };

                    $scope.resetSignature = function () {
                        // We get the Signature object.
                        // The clearSignature() method has been declared in the directive parameters:
                        // <signature-pad clear="clearSignature"
                        $scope.clearSignature();
                        sendSignature(null);
                    };

                    function sendSignature(signaturePicture) {
                        eventManager.propertyChanged({
                            property: 'signature',
                            // oldValue: null,
                            newValue: signaturePicture
                        });
                    }

                    $scope.$watch('rxConfiguration.propertiesByName.command', executeSignatureCommand)
                }
            };
        });
})();