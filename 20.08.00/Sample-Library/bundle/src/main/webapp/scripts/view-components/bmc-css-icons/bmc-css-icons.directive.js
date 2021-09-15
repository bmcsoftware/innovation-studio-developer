(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.bmc-css-icons')
        .directive('comExampleSamplelibraryBmcCssIcons', function () {
            return {
                restrict: 'E',
                templateUrl: 'scripts/view-components/bmc-css-icons/com-example-samplelibrary-bmc-css-icons.directive.html',

                scope: {
                    rxConfiguration: '='
                },

                link: function ($scope) {
                    $scope.allIcons = [];
                    $scope.saveIcons = [];
                    $scope.searchIcon = "";
                    $scope.showSearchInProgress = true;

                    var sSheetList = document.styleSheets;
                    for (var sSheet = 0; sSheet < sSheetList.length; sSheet++) {
                        if (!angular.isString(document.styleSheets[sSheet].href) || document.styleSheets[sSheet].href.indexOf("standardlib-deps.min.css") == -1) {
                            continue;
                        }

                        var ruleList = document.styleSheets[sSheet].cssRules;
                        for (var rule = 0; rule < ruleList.length; rule++) {
                            if (!angular.isString(ruleList[rule].selectorText) || ruleList[rule].selectorText.indexOf(".d-icon-left-") == -1 || angular.isUndefined(ruleList[rule].style.content)) {
                                continue;
                            }

                            var iconShortName = ruleList[rule].selectorText.split(".d-icon-left-")[1];
                            iconShortName = iconShortName.split(":")[0];

                            $scope.saveIcons.push({
                                ruleName: iconShortName,
                                iconCode: ruleList[rule].style.content,
                                className: ruleList[rule].selectorText
                            });
                        }

                        break;
                    }

                    // Sorting the icon list (alpha order).
                    $scope.saveIcons.sort(function (a, b) {
                        return (a.ruleName > b.ruleName) - (a.ruleName < b.ruleName);
                    });

                    $scope.allIcons = $scope.saveIcons;
                    $scope.showSearchInProgress = false;

                    // Sorting icons (filter cannot work on object lists)
                    // Called by $watch
                    function sortIcons() {
                        if ($scope.searchIcon == "") {
                            $scope.allIcons = $scope.saveIcons;
                            return;
                        }

                        if ($scope.searchIcon.length < 3) {
                            return;
                        }

                        $scope.allIcons = [];

                        $scope.showSearchInProgress = true;
                        angular.forEach($scope.saveIcons, function (value, key) {
                            if (value.ruleName.toLowerCase().indexOf($scope.searchIcon.toLowerCase()) != -1) {
                                $scope.allIcons.push(value);
                            }

                        });
                        $scope.showSearchInProgress = false;
                    }

                    // We are watching the search string.
                    $scope.$watch('searchIcon', sortIcons);
                }

            };
        });
})();