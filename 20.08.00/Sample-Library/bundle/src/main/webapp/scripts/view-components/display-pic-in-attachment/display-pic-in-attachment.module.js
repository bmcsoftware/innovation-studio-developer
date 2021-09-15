/*
 This view component is designed to display in an image HTML tag (img) a picture saved in an attachment field.
 */
(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.display-pic-in-attachment', [
        'com.bmc.arsys.rx.standardlib.security',
        'com.bmc.arsys.rx.standardlib.view-component',
        'com.bmc.arsys.rx.standardlib.record.definition',
        'com.bmc.arsys.rx.standardlib.record.instance' // contains rxRecordInstanceResource resource
    ]);
})();