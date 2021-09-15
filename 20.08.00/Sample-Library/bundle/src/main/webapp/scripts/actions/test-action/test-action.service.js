(function () {
    'use strict';

    angular.module('com.example.samplelibrary.actions.test-action').service('comExampleSamplelibraryTestAction', function ($q,
                                                                                                                           dialogs) {
            return {
                // code executed at runtime.
                execute: function (message) {
                    // We are displaying a dialog confirmation modal window.
                    return dialogs.confirm('Warning!', message).result.then(function() {
                        // If the user clicks on "Confirm" we are returning a value.
                        return {ActionResult: 'it went ok!'};
                    }, function() {
                        // If the user clicks on "Cancel" we are returning an "error" so the action chaining will stop.
                        return $q.reject();
                    });
                },
                // Declaring the output parameter. It will be available to the next actions as "available values / actions"
                getOutputParams: function () {
                    return $q.when([
                        {name: 'ActionResult'}
                    ]);
                }
            }
        }
    )
})();
