/**
 * This example is based on this question on BMC Communities and the code shared by a community member :)
 * https://communities.bmc.com/thread/206205?start=0&tstart=0
 *
 * It is using the webcam module provided by 'https://github.com/jonashartmann/webcam-directive'.
 * The webcam.min.js is embedded in this application in the resources/lib folder.
 */
(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.webcam', [
        'com.bmc.arsys.rx.standardlib.view-component',
        'webcam'    // Reference to the AngularJs module 'webcam' (https://github.com/jonashartmann/webcam-directive).
    ]);
})();
