(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.call-process-js')
        .config(function (rxViewComponentProvider) {
            var accessGridDescriptor = {
                name: 'Call Process',
                group: 'Sample Library Components',
                icon: 'gear_play_circle',
                type: 'com-example-samplelibrary-call-process-js',
                designType: 'com-example-samplelibrary-call-process-js-design',
                bundleId: 'com.example.samplelibrary',

                propertiesByName: [
                    {
                        // The fully qualified process name, for example:
                        // "com.example.samplelibrary:Testing calling a process from Javscript"
                        name: 'processName',
                        isConfig: true,
                        isRequired: true,
                        enableExpressionEvaluation: true,
                        editor: 'rx-expression-field'
                    },
                    {
                        // If you check this option we will get the process definition to automatically get
                        // the input and output parameters.
                        name: 'automaticallyDetectProcessInputAndOutputParameters',
                        isConfig: true,
                        editor: 'rx-expression-field',
                        enableExpressionEvaluation: true,
                        defaultValue: 'false'
                    },
                    {
                        // The process input parameters, passed a string, comma separated, for example
                        // "Movie Title,Movie Genre,Movie Release Date"
                        name: 'processInputParameterNameListCommaSeparated',
                        isConfig: true,
                        enableExpressionEvaluation: true,
                        editor: 'rx-expression-field'
                    },
                    {
                        // The process input parameters, passed a string, comma separated, for example
                        // "Movie information as string,Movie Object" 
                        name: 'processOutputParameterNameListCommaSeparated',
                        isConfig: true,
                        enableExpressionEvaluation: true,
                        editor: 'rx-expression-field'
                    },
                    {
                        name: 'processExecutionStatus',
                        isConfig: false,
                        isProperty: true
                    }
                ]
            };

            rxViewComponentProvider.registerComponent(accessGridDescriptor);
        });
})();