(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.api-rxnotificationmessage')
        .directive('comExampleSamplelibraryApiRxnotificationmessage', function (rxNotificationMessage) {
            return {
                restrict: 'E',
                templateUrl: 'scripts/view-components/_apis/api-rxnotificationmessage/com-example-samplelibrary-api-rxnotificationmessage.directive.html',

                scope: {
                    rxConfiguration: '='
                },

                link: function ($scope) {
                    // Api description
                    // Declaration:
                    //  Add module "rxNotificationMessage" in your directive, service etc...
                    // Usage:
                    // rxNotificationMessage.<notificationType>(message, [options]);
                    // <notificationType>:  can be success, error, info, warning
                    // message:             text to display, by default it is displayed as text and notification will be discarded automatically after some time
                    // options:             optional object where you can say if the message is to be displayed as HTML and you can define the TTL of the notification
                            /*{
                                ttl: <valueInMilliseconds>,
                                enableHtml: <true,false>
                            }*/
                    //      Both parameters are optionals in the options object.
                    //          ttl:        will set the duration you want the notification to be displayed on screen. 0 = infinite
                    //          enableHtml: the message will be displayed as HTML
                    // Examples:
                    // rxNotificationMessage.success('Hello World!');
                    // rxNotificationMessage.success('Hello World!', {ttl: 5000});
                    // rxNotificationMessage.success('Hello <b>World</b>!', {enableHtml: true});

                    $scope.notificationText = 'Hello World';
                    $scope.notificationType = 'info';
                    $scope.notificationTtl = 3000;
                    $scope.notificationEnableTtl = false;
                    $scope.notificationEnableHtml = false;
                    $scope.notificationTypes = ['success', 'info', 'warning', 'error'];

                    // Standard notification
                    $scope.sendNotification = function () {
                        var type = $scope.notificationType,
                            message = $scope.notificationText;

                        // You could pass an empty object to rxNotificationMessage but this is to show that the options are...
                        // optional :)
                        if  ($scope.notificationEnableTtl || $scope.notificationEnableHtml) {
                            var options = {};

                            if ($scope.notificationEnableTtl) {
                                options.ttl = $scope.notificationTtl;
                            }

                            if ($scope.notificationEnableHtml) {
                                options.enableHtml = $scope.notificationEnableHtml;
                            }

                            switch (type) {
                                case 'success':
                                    rxNotificationMessage.success(message, options);
                                    break;
                                case 'error':
                                    rxNotificationMessage.error(message, options);
                                    break;
                                case 'info':
                                    rxNotificationMessage.info(message, options);
                                    break;
                                case 'warning':
                                    rxNotificationMessage.warning(message, options);
                                    break;
                                default:
                                    rxNotificationMessage.info(message, options);
                                    break;
                            }

                        } else {
                            switch (type) {
                                case 'success':
                                    rxNotificationMessage.success(message);
                                    break;
                                case 'error':
                                    rxNotificationMessage.error(message);
                                    break;
                                case 'info':
                                    rxNotificationMessage.info(message);
                                    break;
                                case 'warning':
                                    rxNotificationMessage.warning(message);
                                    break;
                                default:
                                    rxNotificationMessage.info(message);
                                    break;
                            }
                        }
                    };

                    // Setting a default HTML message
                    // The picture is in the folder /webapp/resources/images/hey.jpg
                    $scope.setHtmlMessage = function () {
                        if ($scope.notificationEnableHtml) {
                            $scope.notificationText = 'Hello <b>World</b><div><img src="../../com.example.samplelibrary/resources/images/hey.jpg"></div>'
                        }
                    };
                }
            };
        });
})();
