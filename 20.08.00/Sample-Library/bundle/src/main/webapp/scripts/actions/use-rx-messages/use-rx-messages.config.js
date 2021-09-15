(function () {
    'use strict';

    angular.module('com.example.samplelibrary.actions.use-rx-messages').config(['rxActionProvider', function (a) {
        a.registerAction({
            name: 'comExampleSamplelibraryUseRxMessagesAction',
            label: 'Show BMC RX Alert',
            bundleId: 'com.example.samplelibrary',
            parameters: [
                {
                    name: 'message',
                    label: 'Alert Message',
                    enableExpressionEvaluation: true
                },
                {
                    name: 'type',
                    label: 'Message Type',
                    enableExpressionEvaluation: true
                }
            ]
        })
    }
    ])
})();
