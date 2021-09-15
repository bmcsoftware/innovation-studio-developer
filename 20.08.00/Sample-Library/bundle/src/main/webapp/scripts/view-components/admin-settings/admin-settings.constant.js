(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.admin-settings').constant('COM_EXAMPLE_SAMPLE_LIBRARY_ADMIN_SETTING', {
        restUrl: '/com.example.samplelibrary/getAdminSettings/getSetting',
        componentName: 'bookWorm',
        bundleId: 'com.example.samplelibrary',
        settingPreferredAuthorName: 'preferred author',
        settingPreferredBookName: 'preferred Book'
    });
})();