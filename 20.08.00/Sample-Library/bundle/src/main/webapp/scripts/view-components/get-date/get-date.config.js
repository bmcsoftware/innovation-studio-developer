(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.get-date')
        .config(function (rxViewComponentProvider) {
            rxViewComponentProvider.registerComponent([
                {
                    name: 'Get Date',
                    group: 'Sample Library Components',
                    icon: 'clock_o',
                    type: 'com-example-samplelibrary-get-date',
                    designType: 'com-example-samplelibrary-get-date-design',
                    bundleId: 'com.example.samplelibrary',
                    canBeEmbeddedInRecordEditor: true,  // Can be embedded inside a Record Editor.
                    // hideInDesignerPalette: true, // This would hide the View Component in the View Designer Palette.
                    propertiesByName: [
                        {
                            name: 'dummyInputParameter',    // Not used :)
                            type: 'string',
                            isConfig: true
                        },
                        {
                            name: 'returnedDate',
                            type: 'string',
                            isConfig: false,    //  Will not appear as an input parameter
                            isProperty: true    //  An output parameter
                        }
                    ]
                }
            ]);
        });
})();