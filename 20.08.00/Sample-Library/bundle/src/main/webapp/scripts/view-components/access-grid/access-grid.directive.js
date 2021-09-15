(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.access-grid').directive('comExampleSamplelibraryAccessGrid',
        function () {
            return {
                restrict: 'E',
                templateUrl: 'scripts/view-components/access-grid/com-example-samplelibrary-access-grid.directive.html',

                scope: {
                    rxConfiguration: '='
                },

                link: function ($scope) {
                    var _config = $scope.rxConfiguration.propertiesByName,
                        gridApi;

                    function updateSelectedRowIndex() {
                        $scope.rowIndex = _config.rowIndex;
                    }

                    // Used to get the ui-grid core gridApi object
                    function init() {
                        updateSelectedRowIndex();

                        if (_.isObject(_config.gridObject) && _.isFunction(_config.gridObject.getUiGridApi) && !gridApi) {
                            // getUiGridApiAsync() returns a promise.
                            _config.gridObject.getUiGridApiAsync()
                                .then(function (uiGridApi) {
                                    gridApi = uiGridApi;
                                });
                        }
                    }

                    // Selecting a specific visible row in the given grid.
                    // Using ui-grid native apis to select a row in the grid.
                    // selectRowByVisibleIndex():: http://ui-grid.info/docs/#!/api/ui.grid.selection.api:PublicApi
                    $scope.selectRow = function () {
                        var index = $scope.rowIndex ? $scope.rowIndex : 0;

                        if (gridApi) {
                            gridApi.selection.selectRowByVisibleIndex(index);
                        }
                    };

                    // The grid object is loading asynchronously in the view.
                    $scope.$watch('rxConfiguration.propertiesByName.gridObject', init);
                    $scope.$watch('rxConfiguration.propertiesByName.rowIndex', updateSelectedRowIndex);
                }
            };
        });
})();