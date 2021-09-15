/*
 This view component show to get and send objects and lists to the backend.
 The object in the backend is actually a Class and will automatically map from JSON and to JSON
 using class properties rather than manual mapping.
 This view component is mostly here for display, the main code is in Java:
 \Sample-Library-Public\bundle\src\main\java\com\example\rest\RestTicket.java
 */
(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.send-list', [
        'com.bmc.arsys.rx.standardlib.view-component'
    ]);
})();