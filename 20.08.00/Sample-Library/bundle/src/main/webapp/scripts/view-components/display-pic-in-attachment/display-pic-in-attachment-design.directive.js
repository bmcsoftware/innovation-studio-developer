(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.display-pic-in-attachment').directive('comExampleSamplelibraryDisplayPicInAttachmentDesign', function () {
        return {
            restrict: 'E',
            templateUrl: 'scripts/view-components/display-pic-in-attachment/com-example-samplelibrary-display-pic-in-attachment-design.directive.html',

            scope: {
                rxConfiguration: '='
            }
        };
    });
})();