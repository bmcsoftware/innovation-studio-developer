(function () {
    'use strict';

    angular.module('com.example.samplelibrary.actions.show-alert').config(["rxActionProvider", function (a) {
        a.registerAction({
            name: 'comExampleSamplelibraryShowAlertAction',
            label: 'Show Alert',
            bundleId: 'com.example.samplelibrary',
            parameters: [
                {
                    name: 'message',
                    label: 'Alert Message',
                    enableExpressionEvaluation: true
                }]
        })
    }
    ])
})();
