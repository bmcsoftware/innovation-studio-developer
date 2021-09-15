(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.qrcode-reader').directive('comExampleSamplelibraryQrcodeReaderDesign', function () {
        return {
            restrict: 'E',
            templateUrl: 'scripts/view-components/qrcode-reader/com-example-samplelibrary-qrcode-reader-design.directive.html',

            scope: {
                rxConfiguration: '='
            }
        };
    });
})();
