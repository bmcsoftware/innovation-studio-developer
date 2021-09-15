/**
 * This custom javascript action shows how to download a specific attachment file.
 * It also shows how to use different type of input parameters types, some BMC OOTB,
 * and a custom one.
 */
(function () {
    'use strict';

    angular.module('com.example.samplelibrary.actions.download-file', [
        'com.bmc.arsys.rx.standardlib',
        'com.bmc.arsys.rx.standardlib.action',
        'com.bmc.arsys.rx.standardlib.utils',
        'com.bmc.arsys.rx.standardlib.view-components.action'
    ]);
})();