(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.digital-signature').directive('comExampleSamplelibraryDigitalSignatureDesign', function () {
        return {
            restrict: 'E',
            templateUrl: 'scripts/view-components/digital-signature/com-example-samplelibrary-digital-signature-design.directive.html',

            scope: {
                rxConfiguration: '='
            }
        };
    });
})();