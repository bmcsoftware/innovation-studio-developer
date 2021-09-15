/*
The Resources return a promise.
 */

(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.user-infos').factory('comExampleSamplelibraryUserInfosResource', function (COM_EXAMPLE_SAMPLE_LIBRARY_USER_INFOS,
                                                                                                                                         rxResource) {
        // rxResource is to call a custom Java API
        var _resource = rxResource.withSubUrlConfiguration(COM_EXAMPLE_SAMPLE_LIBRARY_USER_INFOS.getInfosUrl, function (RestangularConfigurer) {
            RestangularConfigurer.setRestangularFields({'id': 'name'});
        });

        function getUserInfos() {
            return _resource.get('');
        }

        return {
            getUserInfos: getUserInfos
        };
    });
})();