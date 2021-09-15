(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.custom-grid')
        .filter('comExampleSamplelibraryCustomGridConcatenate', function () {
            return function (input, row) {
                return 'The movie ' + row['title'] + ' is at ' + row['price'];
            };
        });
})();