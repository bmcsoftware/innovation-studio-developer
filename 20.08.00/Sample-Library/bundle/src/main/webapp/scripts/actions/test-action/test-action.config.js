(function () {
    'use strict';

    angular.module('com.example.samplelibrary.actions.test-action').config(['rxActionProvider', function (a) {
        a.registerAction({
            name: 'comExampleSamplelibraryTestAction',
            label: 'Testing Action',
            bundleId: 'com.example.samplelibrary',
            parameters: [
                {
                    name: 'message',
                    label: 'Message',
                    enableExpressionEvaluation: true
                }
            ]
        })
    }
    ])
})();
