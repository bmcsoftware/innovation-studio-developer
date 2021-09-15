/*
 This view component is designed to be a star rating system.
 You can define many parameters in design phase using helpers (slider, color pickers).
 The result will be available inside an output parameter.
 */
(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.star-click-rating', [
        'com.bmc.arsys.rx.standardlib.view-component',
        'com.bmc.arsys.rx.standardlib.record.definition',
        'com.bmc.arsys.rx.standardlib.record.instance', // contains rxRecordInstanceResource resource
        'rzModule',             //For slider
        'ui.bootstrap',         //For slider
        'colorpicker.module'    //For color picker
    ]);
})();