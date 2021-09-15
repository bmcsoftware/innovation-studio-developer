/*
The Resources (Command and Resources) return a promise.
 */

(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.rest-command').factory('comExampleSamplelibraryResource', function (COM_EXAMPLE_SAMPLE_LIBRARY,
                                                                                                                                  rxCommandResource,
                                                                                                                                  rxLog,
                                                                                                                                  rxResource,
                                                                                                                                  rxServerErrorHandler) {
        // rxResource is to call a custom Java API
        var _resource = rxResource.withSubUrlConfiguration(COM_EXAMPLE_SAMPLE_LIBRARY.testUrl, function (RestangularConfigurer) {
            RestangularConfigurer.setRestangularFields({'id': 'name'});
        });

        function testCommand(username, password) {
            var parameters = {
                username: username,
                password: password
            };

            // rxCommandResource is to call a Custom Java Command
            return rxCommandResource
                .withType(COM_EXAMPLE_SAMPLE_LIBRARY.command)
                .execute(parameters, {}, {}, {
                    handleResponseError: function (response) {
                        // Here we use a custom error handler, this is optional.
                        // If you do not provide a custom error handler the application error handling
                        // will kick in.
                        rxLog.debug(rxServerErrorHandler.getServerResponseErrorDetails(response));

                        // true must be returned to indicate the error has been successfully trapped.
                        return true;
                    }
                });
        }

        function testRestAPI(userName) {
            // If there are parameters to send to the REST Api (?test=1&test2=test) you need to add an object.
            // var parameters = {test: '1', test2: test}
            // return _resource.get(userName, parameters);
            return _resource.get(userName);
        }

        return {
            testCommand: testCommand,
            testRestAPI: testRestAPI
        };
    });
})();