/**
 * This example is based on this question on BMC Communities and the code shared by a community member :)
 * https://communities.bmc.com/thread/206205?start=0&tstart=0
 *
 * It is using the webcam module provided by 'https://github.com/jonashartmann/webcam-directive'.
 * The webcam.min.js is embedded in this application in the resources/lib folder.
 */
(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.webcam').directive('comExampleSamplelibraryWebcam',
        function ($document,
                  rxGUID,
                  rxNotificationMessage,
                  rxViewComponentEventManager) {
            return {
                restrict: 'E',
                templateUrl: 'scripts/view-components/webcam/com-example-samplelibrary-webcam.directive.html',

                scope: {
                    rxConfiguration: '='
                },

                link: function ($scope) {
                    // rxViewComponentEventManager is used to broadcast a parameter to other view components
                    var eventManager = rxViewComponentEventManager.getInstance($scope),
                        webcamObject;

                    $scope.snapshotFieldId = rxGUID.generate('preview-')

                    // Make the base64 picture available to other view components.
                    function broadcastPicture(picture) {
                        eventManager.propertyChanged({
                            property: 'base64Image',
                            oldValue: null,
                            newValue: picture
                        });
                    }

                    // Setup a channel to receive a video property
                    // with a reference to the video element
                    // See the HTML binding in the directive html.
                    $scope.channel = {};
                    $scope.isWebcamError = false;

                    // Method called by the Webcam.
                    $scope.onError = function (error) {
                        $scope.isWebcamError = true;
                        rxNotificationMessage.error('Webcam error ' + error);
                        console.error(error);
                    };

                    // Method called by the Webcam.
                    $scope.onStreaming = function () {
                        // The video element contains the captured camera data
                        $scope.isWebcamError = false;
                        webcamObject = $scope.channel.video;
                    };

                    // Method called by the Webcam.
                    $scope.onStream = function (stream) {
                        // You could do something manually with the stream.
                    };

                    // Taking a picture and making it available to other view components.
                    $scope.takeSnapshot = function () {
                        if (webcamObject) {
                            var canvas = _.first($document.find('#' + $scope.snapshotFieldId));

                            if (!canvas) {
                                return;
                            }

                            canvas.width = webcamObject.width;
                            canvas.height = webcamObject.height;
                            getVideoFrame(canvas);

                            broadcastPicture(canvas.toDataURL());
                        }
                    };

                    // Extract a frame from the webcam video feed.
                    function getVideoFrame(canvas) {
                        var canvasContext = canvas.getContext('2d');

                        canvasContext.drawImage(webcamObject, 0, 0, webcamObject.width, webcamObject.height);
                    }
                }
            };
        });
})();
