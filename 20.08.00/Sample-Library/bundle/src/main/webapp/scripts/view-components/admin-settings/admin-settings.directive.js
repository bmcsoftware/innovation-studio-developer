(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.admin-settings')
        .directive('comExampleSamplelibraryAdminSettings', function ($q,
                                                                     rxAdministrationSettingsResource,
                                                                     rxNotificationMessage,
                                                                     COM_EXAMPLE_SAMPLE_LIBRARY_ADMIN_SETTING,
                                                                     comExampleSamplelibraryAdminSettingsResource) {
            return {
                restrict: 'E',
                templateUrl: 'scripts/view-components/admin-settings/com-example-samplelibrary-admin-settings.directive.html',

                scope: {
                    rxConfiguration: '='
                },

                link: function ($scope) {
                    _.assign($scope, {
                        fetchInProgress: true,
                        favoriteBook: '',
                        favoriteAuthor: '',
                        uiComponentSettings: {},
                        uiPreferences: {}
                    });

                    // For clarity reasons we do two functions that show how to get the admin settings from the UI using BMC
                    // OOTB objects, and from the backend using a custom Rest API ("com/example/rest/RestAdminSettings.java").
                    // We call them one after the other.
                    getAdminConfigurationFromBackend();

                    // We get the admin configuration from the UI
                    function getAdminConfigurationFromBackend() {
                        // We want to get two parameters from the backend so we use $q to 'stack' the request and the web browser will return
                        // once both queries are resolved.
                        // bundle: com.example.samplelibrary
                        // Component: bookWorm
                        // Settings to fetch: 'preferred author' and 'preferred Book'

                        $q.all({
                            preferredBook: comExampleSamplelibraryAdminSettingsResource.getAdminSetting(COM_EXAMPLE_SAMPLE_LIBRARY_ADMIN_SETTING.bundleId,
                                COM_EXAMPLE_SAMPLE_LIBRARY_ADMIN_SETTING.componentName,
                                COM_EXAMPLE_SAMPLE_LIBRARY_ADMIN_SETTING.settingPreferredBookName),
                            preferredAuthor: comExampleSamplelibraryAdminSettingsResource.getAdminSetting(COM_EXAMPLE_SAMPLE_LIBRARY_ADMIN_SETTING.bundleId,
                                COM_EXAMPLE_SAMPLE_LIBRARY_ADMIN_SETTING.componentName,
                                COM_EXAMPLE_SAMPLE_LIBRARY_ADMIN_SETTING.settingPreferredAuthorName)
                        })
                            .then(function (data) {
                                // The object returned by the backend in this example is our custom Java class "com/example/rest/AdminSetting.java"
                                /*
                                {
                                    "bundleId": "com.example.samplelibrary",
                                    "componentName": "bookWorm",
                                    "settingName": "test",
                                    "settingValue": "test is great",
                                    "errorMessage": "",
                                    "errorLevel": "",
                                }
                                */

                                // Getting the information for the preferred book
                                $scope.favoriteBook = data.preferredBook.settingValue;

                                if (data.preferredBook.errorLevel === 'ERROR') {
                                    rxNotificationMessage.error(data.preferredBook.errorMessage)
                                } else if (data.preferredBook.errorLevel === 'WARN') {
                                    rxNotificationMessage.warning(data.preferredBook.errorMessage)
                                }

                                // Getting the information for the preferred book
                                $scope.favoriteAuthor = data.preferredAuthor.settingValue;

                                if (data.preferredAuthor.errorLevel === 'ERROR') {
                                    rxNotificationMessage.error(data.preferredAuthor.errorMessage)
                                } else if (data.preferredAuthor.errorLevel === 'WARN') {
                                    rxNotificationMessage.warning(data.preferredAuthor.errorMessage)
                                }
                            })
                            .catch(function (error) {
                                rxNotificationMessage.error('Error fetching UI settings from Backend.');
                            })
                            .finally(function () {
                                getAdminConfigurationFromUI();
                            })
                    }

                    // We get the admin configuration from the UI
                    function getAdminConfigurationFromUI() {
                        // We want to get all settings from the bookWorm component.
                        // bundle: com.example.samplelibrary
                        // Component: bookWorm
                        // Settings to fetch: 'preferred author' and 'preferred Book'.

                        // Those settings are necessary to get admin settings from the UI
                        // In our case the context is 'local':
                        rxAdministrationSettingsResource.setContext(true);
                        // We need to set the bundle scope to our bundle:
                        rxAdministrationSettingsResource.setBundleScope(COM_EXAMPLE_SAMPLE_LIBRARY_ADMIN_SETTING.bundleId);

                        // The object returned has this kind of structure which is a bit complex:
                        /*
                            {
                              "values": [
                                {
                                  "settingId": "AGGADG1AANVNMAP35057P284VKB7C0",
                                  "componentName": "bookWorm",
                                  "settingName": "preferred Book",
                                  "settingValue": "Dune is great",
                                  "ownerKeyValue1": "AGGADG1AANVNMAP35057P284VKB7C0"
                                },
                                {
                                  "settingId": "AGGADG1AANVNMAP35057P284VKB7C1",
                                  "componentName": "bookWorm",
                                  "settingName": "preferred author",
                                  "settingValue": "Frank Herbert is great",
                                  "ownerKeyValue1": "AGGADG1AANVNMAP35057P284VKB7C0"
                                }
                              ]
                            }
                        */

                        // Then we can fetch the admin settings Data.
                        rxAdministrationSettingsResource.getComponentSettingData(COM_EXAMPLE_SAMPLE_LIBRARY_ADMIN_SETTING.componentName)
                            .then(function () {
                                // We use Lodash (https://lodash.com/docs/3.10.1) to easily extract the object we are interested in
                                var uiPreferredBook,
                                    uiPreferredAuthor;

                                /*values: [
                                {
                                    "settingId": "AGGADG1AANVNMAP35057P284VKB7C2",
                                    "componentName": "bookWorm",
                                    "settingName": "preferred Book",
                                    "settingValue": "Dune",
                                    "ownerKeyValue1": "AGGADG1AANVNMAP35057P284VKB7C0"
                                },
                                {
                                    "settingId": "AGGADG1AANVNMAP35057P284VKB7C1",
                                    "componentName": "bookWorm",
                                    "settingName": "preferred author",
                                    "settingValue": "Frank Herbert is great",
                                    "ownerKeyValue1": "AGGADG1AANVNMAP35057P284VKB7C0"
                                }
                                ]
                            */

                                if (data && data.values) {
                                    uiPreferredBook = _.find(data.values, {settingName: COM_EXAMPLE_SAMPLE_LIBRARY_ADMIN_SETTING.settingPreferredBookName});
                                    uiPreferredAuthor = _.find(data.values, {settingName: COM_EXAMPLE_SAMPLE_LIBRARY_ADMIN_SETTING.settingPreferredAuthorName});

                                    // Each object should contain something like:
                                    /*
                                    {
                                        "settingId": "AGGADG1AANVNMAP35057P284VKB7C1",
                                        "componentName": "bookWorm",
                                        "settingName": "preferred author",
                                        "settingValue": "Frank Herbert is great",
                                        "ownerKeyValue1": "AGGADG1AANVNMAP35057P284VKB7C0"
                                    }
                                    */

                                    // Getting uiPreferredBook.settingValue if it exists
                                    $scope.uiPreferredBook = _.get(uiPreferredBook, 'settingValue');
                                    // Getting uiPreferredAuthor.settingValue if it exists
                                    $scope.uiPreferredAuthor = _.get(uiPreferredAuthor, 'settingValue');
                                }
                            })
                            .catch(function (error) {
                                rxNotificationMessage.error('Error fetching UI settings from UI.');
                            })
                            .finally(function () {
                                $scope.fetchInProgress = false;
                                rxNotificationMessage.info('Admin settings fetched!');
                            });
                    }
                }
            };
        });
})();
