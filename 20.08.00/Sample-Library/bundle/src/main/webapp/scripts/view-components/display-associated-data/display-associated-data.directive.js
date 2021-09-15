(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.display-associated-data').directive('comExampleSamplelibraryDisplayAssociatedData',
        function (rxAssociationInstanceDataPageResource) {
            return {
                restrict: 'E',
                templateUrl: 'scripts/view-components/display-associated-data/com-example-samplelibrary-display-associated-data.directive.html',

                scope: {
                    rxConfiguration: '='
                },

                link: function ($scope) {
                    var _config;


                    // Getting the view component input parameters
                    var init = function () {
                        _config = $scope.rxConfiguration.propertiesByName;
                        $scope.cfg = {};
                        $scope.cfg.recordDefinitionName = 'nodeB';  // We want the right part of the association (else it would be nodeA).
                        $scope.cfg.recordInstanceId = _config.recordInstanceId;
                        $scope.cfg.AssociationName = _config.AssociationName;
                        $scope.cfg.fieldIdToDisplay = _config.fieldIdToDisplay;
                        $scope.cfg.fieldLabelToDisplay = _config.fieldLabelToDisplay;
                        $scope.myDataWithoutAssociations = [];
                        $scope.myDataWithAssociations = [];

                        // Getting associated data
                        getDataWithAssociation();
                    };

                    // Calling the javascript code that fetches data using BMC OOTB Javascript APis.
                    var getDataWithAssociation = function () {
                        if (angular.isUndefined($scope.cfg.recordInstanceId)) {
                            return;
                        }

                        var queryParams = {
                            associationDefinition: $scope.cfg.AssociationName,
                            nodeToQuery: $scope.cfg.recordDefinitionName,
                            associatedRecordInstanceId: $scope.cfg.recordInstanceId
                        };

                        var foo = rxAssociationInstanceDataPageResource.get(-1, 0, queryParams);
                        foo.then(function (response) {
                            $scope.myDataWithAssociations = response.data;
                        });

                    };

                    // Calling init function when the record Instance ID input parameter changes
                    init();
                    // Each time the recordInstanceId will be modified, 'init' method will be called.
                    $scope.$watch('rxConfiguration.propertiesByName.recordInstanceId', init);
                }
            };
        });
})();