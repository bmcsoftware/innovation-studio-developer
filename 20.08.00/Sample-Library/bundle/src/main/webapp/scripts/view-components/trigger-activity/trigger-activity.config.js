(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.trigger-activity')
        .config(function (rxViewComponentProvider) {
            rxViewComponentProvider.registerComponent([
                {
                    name: 'Trigger Process Activity',
                    group: 'Sample Library Components',
                    icon: 'gear_play_circle',
                    type: 'com-example-samplelibrary-trigger-activity',
                    designType: 'com-example-samplelibrary-trigger-activity-design',
                    bundleId: 'com.example.samplelibrary',
                    propertiesByName: [
                        {
                            name: 'username',
                            type: 'string',
                            isConfig: true,     // Input parameter
                            isProperty: false,  // Not an output parameter
                            isRequired: true,  // Not required
                            enableExpressionEvaluation: true    // The expression will be evaluated.
                        }
                    ]
                }
            ]);
        });
})();