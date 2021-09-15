/*
 This view component is designed to be a star rating system.
 The number of stars defined at design phase in the input parameter will be displayed
 at design phase in the canvas.
 This view component will directly update a record in a record definition.
 */
(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.star-rating', [
        'com.bmc.arsys.rx.standardlib.view-component',
        'com.bmc.arsys.rx.standardlib.record.definition',
        'com.bmc.arsys.rx.standardlib.record.instance' // contains rxRecordInstanceResource resource
    ]);
})();