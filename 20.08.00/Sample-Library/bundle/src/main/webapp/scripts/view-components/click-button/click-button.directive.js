(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.click-button').directive('comExampleSamplelibraryClickButton', function ($document,
                                                                                                                                       $timeout,
                                                                                                                                       rxNotificationMessage,
                                                                                                                                       rxString) {
            return {
                restrict: 'E',
                templateUrl: 'scripts/view-components/click-button/com-example-samplelibrary-click-button.directive.html',

                scope: {
                    rxConfiguration: '='
                },

                link: function ($scope) {
                    var _config = $scope.rxConfiguration.propertiesByName;

                    $scope.buttonLabel = _config.buttonLabel;
                    $scope.buttonGuid = _config.buttonGuid;

                    $scope.clickButton = function (type) {
                        // We have to use $timeout to avoid a conflict with the angularJs digest cycle.
                        $timeout(function(){
                            var button;

                            if (type === 'guid'){
                                // We are looking for the rx-action-button with the given Guid and then the button embedded inside of it.
                                var buttonGuid = rxString.format('rx-action-button[rx-view-component-id=\'%s\'] > button', $scope.buttonGuid);

                                button = $document.find(buttonGuid);
                            } else {
                                var buttonLabel = rxString.format('span:contains(\'%s\')', $scope.buttonLabel);

                                // We use jQuery for this. Though this might not work if the label is localized...
                                // We look for a <span> which has for value the button label.
                                button = $(buttonLabel);
                            }

                            if (button) {
                                button.click();
                            } else {
                                rxNotificationMessage.error('Cannot find button ' + $scope.buttonGuid);
                            }
                        });
                    };
                }
            };
        });
})();