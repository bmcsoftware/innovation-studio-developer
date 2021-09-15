(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.custom-label')
        .filter('comExampleSamplelibraryMyFilter', function () {
            return function (labelText) {
                return 'The label parameter value is: ' + labelText;
            };
        });
})();
