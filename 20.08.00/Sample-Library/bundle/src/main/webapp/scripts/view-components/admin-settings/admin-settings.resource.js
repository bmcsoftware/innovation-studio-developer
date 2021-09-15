/*
The Resources return a promise.
 */

(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.admin-settings')
        .factory('comExampleSamplelibraryAdminSettingsResource', function (COM_EXAMPLE_SAMPLE_LIBRARY_ADMIN_SETTING,
                                                                           rxResource,
                                                                           rxString) {
            // rxResource is to call a custom Java API
            var _resource = rxResource.withSubUrlConfiguration(COM_EXAMPLE_SAMPLE_LIBRARY_ADMIN_SETTING.restUrl, function (RestangularConfigurer) {
                RestangularConfigurer.setRestangularFields({'id': 'name'});
            });

            function getAdminSetting(bundleId, componentName, settingName) {
                return _resource.get(rxString.format('%s/%s/%s', bundleId, componentName, settingName));
            }

            return {
                getAdminSetting: getAdminSetting
            };
        });
})();