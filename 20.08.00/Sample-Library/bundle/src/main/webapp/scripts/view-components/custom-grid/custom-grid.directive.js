(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.custom-grid')
        .directive('comExampleSamplelibraryCustomGrid', function (RX_RECORD_GRID,
                                                                  RX_RECORD_DEFINITION,
                                                                  rxDataPageResource,
                                                                  rxViewComponentEventManager) {
            return {
                restrict: 'E',
                templateUrl: 'scripts/view-components/custom-grid/com-example-samplelibrary-custom-grid.directive.html',

                scope: {
                    rxConfiguration: '='
                },

                link: function ($scope) {
                    var _config = $scope.rxConfiguration.propertiesByName,
                        eventManager = rxViewComponentEventManager.getInstance($scope);

                    $scope.title = _config.titleFilter;

                    /*
                    It is possible to customize the css class applied to a cell, for example using
                    the ui-grid cellClass method:
                    http://ui-grid.info/docs/#!/tutorial/Tutorial:%20111%20CellClass
                    There are some differences with the ui-grid implementation as BMC
                    wraps the column definition.
                    As you can see below, instead of having:
                        cellClass: function(grid, row, col, rowRenderIndex, colRenderIndex) {
                    We have one argument, which is an array containing the different objects:
                        cellClass: function (argumentList) {
                            var grid = argumentList[0],
                            row = argumentList[1],
                            col = argumentList[2],
                            rowRenderIndex = argumentList[3],
                            colRenderIndex = argumentList[4];

                     The applied css classes need to be "global", not under the view component class
                     as usually done.
                     Please check the styles in the file "_custom-grid.scss" to see the css classes
                     com-example-samplelibrary-custom-grid-green-class
                     com-example-samplelibrary-custom-grid-red-class
                     */

                    // We need to configure the grid
                    // Some of the parameters are OOTB ui-grid (http://ui-grid.info/) some are BMC
                    $scope.gridConfiguration = {
                        enableFiltering: false,
                        enableRowSelection: RX_RECORD_GRID.selectionTypes.single,
                        pageSize: 20,
                        // Column list.
                        // fieldId is actually the fieldName coming from the datapagequery, here:
                        /*
                            {
                                "title": "Terminator II",
                                "price": "34$"
                            }
                        */
                        columns: [
                            {
                                fieldId: 'title',
                                title: 'Title',
                                cellClass: 'com-example-samplelibrary-custom-grid-green-class'
                            },
                            {
                                fieldId: 'price',
                                title: 'Price',
                                cellClass: function (argumentList) {
                                    var grid = argumentList[0],
                                        row = argumentList[1],
                                        col = argumentList[2],
                                        rowRenderIndex = argumentList[3],
                                        colRenderIndex = argumentList[4];

                                    console.log(grid);
                                    console.log(row);
                                    console.log(col);
                                    console.log(rowRenderIndex);
                                    console.log(colRenderIndex);
                                    console.log('Row entity = ' + row.entity['price']);
                                    console.log(grid.getCellValue(row, col));
                                    console.log(' ');

                                    return 'com-example-samplelibrary-custom-grid-red-class';
                                }
                            },
                            {
                                fieldId: 'calculation',
                                title: 'calculation',
                                cellClass: 'com-example-samplelibrary-custom-grid-green-class',
                                cellFilter: 'comExampleSamplelibraryCustomGridConcatenate: row.entity'
                            },
                            {
                                fieldId: 'nicehtml',
                                title: 'Nice HTML',
                                cellClass: 'com-example-samplelibrary-custom-grid-green-class',
                                cellTemplate: [
                                    '<div class="ui-grid-cell-contents">',
                                    '<a>{{grid.appScope.handlePrice(row)}}.',
                                    '</a>',
                                    '</div>'
                                ].join('')
                            }
                        ],
                        // getData will override how we get data, usually we just give a record definition name etc… Here we provide data from a custom datapage query.
                        // \bundle\src\main\java\com\example\datapage\DvdDataPageQuery.java
                        // com.example.datapage.DvdDataPageQuery
                        getData: function (pageSize, startIndex, queryParams, queryArgs) {
                            // For the filters we need to convert from fieldName to fieldIds as
                            // in the Java code we are querying a record definition.
                            // The filter is set in the text zone in the grid itself.
                            var customFilter = queryParams.queryExpression ? queryParams.queryExpression : '';

                            if (customFilter) {
                                customFilter = customFilter.replace('\'title\'', '\'10029002\'');
                                customFilter = customFilter.replace('\'price\'', '\'10029003\'');
                            }

                            return rxDataPageResource
                                .withType({dataPageType: _config.datapagequeryName})
                                .get(pageSize, startIndex, {
                                    title: $scope.title,
                                    customFilter: customFilter
                                });
                        },
                        // Field Type, once again the id is actually the fieldname coming from the datapagequery
                        getRecordDefinition: function () {
                            return {
                                fieldDefinitions: [
                                    {
                                        id: 'title',
                                        resourceType: RX_RECORD_DEFINITION.dataTypes.character.resourceType
                                    },
                                    {
                                        id: 'price',
                                        resourceType: RX_RECORD_DEFINITION.dataTypes.character.resourceType
                                    },
                                    {
                                        id: 'calculation',
                                        resourceType: RX_RECORD_DEFINITION.dataTypes.character.resourceType
                                    },
                                    {
                                        id: 'nicehtml',
                                        resourceType: RX_RECORD_DEFINITION.dataTypes.character.resourceType
                                    }
                                ]
                            };
                        },
                        // Here it’s advanced options, for example it’s to do something when the selection changes.
                        // Those methods are explained in ui-grid documentation.
                        uiGridOptions: {
                            // We disable select all functionality (ui-grid parameter)
                            enableSelectAll: false,

                            onRegisterApi: function (api) {
                                // Grabbing ui-grid api object
                                $scope.gridApi = api;

                                function onRowSelectionChanged() {
                                    // Add your own code here.
                                    // This code will be triggered when a line is selected.

                                    // Here we output the selectedTitle
                                    var selectedDvds = api.selection.getSelectedRows(),
                                        selectedTitles = _.map(selectedDvds, 'title').join(', ');

                                    eventManager.propertyChanged({
                                        property: 'selectedTitle',
                                        oldValue: null,
                                        newValue: selectedTitles
                                    });
                                }

                                // Method that can be accessed in a cellTemplate.
                                api.grid.appScope.handlePrice = function (gridRow) {
                                    return 'The price is ' + gridRow.entity['price'];
                                }

                                // We plug those ui-grid events and tell them to execute method onRowSelectionChanged.
                                api.selection.on.rowSelectionChanged(null, onRowSelectionChanged);
                                api.selection.on.rowSelectionChangedBatch(null, onRowSelectionChanged);
                            }
                        }
                    };

                    var init = function () {
                        $scope.title = _config.titleFilter;
                    };

                    $scope.$watch('rxConfiguration.propertiesByName.titleFilter', init);
                }
            };
        });
})();