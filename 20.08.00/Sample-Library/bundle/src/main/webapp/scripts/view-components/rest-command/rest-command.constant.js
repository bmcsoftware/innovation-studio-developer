(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.rest-command').constant('COM_EXAMPLE_SAMPLE_LIBRARY', {
        testUrl: '/com.example.samplelibrary/hello/world',
        command: 'com.example.command.SimpleCommand'
    });
})();