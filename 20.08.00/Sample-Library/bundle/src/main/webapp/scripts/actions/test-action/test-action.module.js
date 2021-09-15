/**
 * This custom javascript action shows to create a confirmation dialog window and return a string
 * when the user confirms its choice. It also rejects when the user does not confirm.
 * This shows how to create a synchronous action, which means the action chaining will be stopped
 * until this action return.
 */
(function () {
    'use strict';

    angular.module('com.example.samplelibrary.actions.test-action', ['com.bmc.arsys.rx.standardlib.action']);
})();