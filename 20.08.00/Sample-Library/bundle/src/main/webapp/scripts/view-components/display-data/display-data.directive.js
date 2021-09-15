(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.display-data').directive('comExampleSamplelibraryDisplayData',
        function (rxRecordInstanceDataPageResource) {
            return {
                restrict: 'E',
                templateUrl: 'scripts/view-components/display-data/com-example-samplelibrary-display-data.directive.html',

                scope: {
                    rxConfiguration: '='
                },

                link: function ($scope) {
                    var _config;

                    //Getting parameters
                    function init() {
                        _config = $scope.rxConfiguration.propertiesByName;
                        $scope.cfg = {};
                        $scope.cfg.recordDefinitionName = _config.recordDefinitionName;
                        $scope.cfg.fieldIdToDisplay = _config.fieldIdToDisplay;
                        $scope.cfg.fieldLabelToDisplay = _config.fieldLabelToDisplay;
                        $scope.myData = [];

                        //Calling data fetch function (standard BMC OOTB Javascript APIs)
                        getData();
                    }

                    //Calling the javascript code that fetches data.
                    function getData() {
                        var queryParams = {
                            propertySelection: "179,7," + $scope.cfg.fieldIdToDisplay,//, // ids of fields to fetch
                            queryExpression: "'7' != 3" //Status is not rejected
                        };

                        var foo = rxRecordInstanceDataPageResource.withName($scope.cfg.recordDefinitionName);
                        foo.get(100, 0, queryParams).then(
                            function (allRecords) {
                                $scope.myData = allRecords.data;
                            }
                        );
                    }

                    //Calling init function, only once.
                    init();
                }
            };
        });
})();