/*
 This view component is designed to display a record definition data,
 using OOTB BMC Javascript APIs.
 */
(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.display-data', [
        'com.bmc.arsys.rx.standardlib.view-component',
        'com.bmc.arsys.rx.standardlib.record.definition',
        'com.bmc.arsys.rx.standardlib.record.instance' // contains rxRecordInstanceResource resource
    ]);
})();