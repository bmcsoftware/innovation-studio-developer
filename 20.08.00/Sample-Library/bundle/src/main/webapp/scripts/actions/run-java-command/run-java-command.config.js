(function () {
    'use strict';

    angular.module('com.example.samplelibrary.actions.run-java-command').config(["rxActionProvider", function (a) {
        a.registerAction({
            name: 'comExampleSamplelibraryRunJavaCommand',
            label: 'Run Java Command',
            bundleId: 'com.example.samplelibrary',
            parameters: [
                {
                    name: 'commandClassName',
                    label: 'Command Java Class Name',
                    enableExpressionEvaluation: true
                },
                {
                    name: 'commandParameterValueList',
                    label: 'Parameter Name list',
                    enableExpressionEvaluation: true
                }
            ]
        })
    }
    ])
})();