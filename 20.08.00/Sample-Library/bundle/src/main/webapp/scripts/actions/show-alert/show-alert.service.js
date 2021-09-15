(function () {
    'use strict';
    // Service name is defined in show-alert.config.js:
    // name: 'comExampleSamplelibraryShowAlertAction',

    // This code displays a popup and also returns a value to be used by another action.
    angular.module('com.example.samplelibrary.actions.show-alert').service('comExampleSamplelibraryShowAlertAction', function ($q,
                                                                                                                               $window) {
            return {
                // code executed at runtime.
                execute: function (message) {
                    // We display the popup
                    $window.alert(message);

                    // We prepare the values to be returned.
                    var returnedValue1 = message + ', output 1';
                    var returnedValue2 = message + ', output 2';

                    // We return the output parameters values.
                    // In this case it is a simple object, NOT an array.
                    return $q.when(
                        {ouputValue1: returnedValue1, ouputValue2: returnedValue2}
                    );

                }
                ,
                // Declaring the output parameters. They will then be available to the next actions as 'available values / actions'
                getOutputParams: function () {
                    // Returning the output parameters as an array of objects.
                    // We define the output parameters names here (NOT the values).
                    // The values will be set in the 'execute' method.
                    return $q.when([
                        {name: 'ouputValue1'},
                        {name: 'ouputValue2'}
                    ]);

                }

            }

        }
    )
})();
