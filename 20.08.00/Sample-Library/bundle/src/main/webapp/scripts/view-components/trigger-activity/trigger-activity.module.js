/**
 * This example shows how to trigger a process activity directly rather than launching a process.
 * For example you could trigger a "connector" activity and get the result in your Java code.
 * Here we are going to call the custom activity coded earlier "generatePassword"
 * (\Sample-Library-Public\bundle\src\main\java\com\example\service\SimpleService.java) and get
 * the result in the Java code.
 * But you could use a connector activity, create record etc...
 * Here this view Component calls the Rest API .RestTriggerActivity".
 *
 * Another potential pro of this method is that you could return a Map<String, Object> in your code.
 */
(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.trigger-activity', [
        'com.bmc.arsys.rx.standardlib.view-component'
    ]);
})();