/*
The Resources return a promise.
 */

(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.trigger-activity')
        .factory('comExampleSamplelibraryTriggerActivityResource', function (COM_EXAMPLE_SAMPLE_LIBRARY_TRIGGER_ACTIVITY,
                                                                             rxResource) {
            // rxResource is to call a custom Java API
            var _resource = rxResource.withSubUrlConfiguration(COM_EXAMPLE_SAMPLE_LIBRARY_TRIGGER_ACTIVITY.generatePasswordUrl, function (RestangularConfigurer) {
                RestangularConfigurer.setRestangularFields({'id': 'name'});
            });

            // We do not need to create a method here and we can directly pass all parameters to the
            // _ressource.get
            /*
            function callGeneratePassword(userName) {
                return _resource.get(userName);
            }
            */

            return {
                // See above for explanation
                // callGeneratePassword: callGeneratePassword
                callGeneratePassword: _resource.get
            };
        });
})();