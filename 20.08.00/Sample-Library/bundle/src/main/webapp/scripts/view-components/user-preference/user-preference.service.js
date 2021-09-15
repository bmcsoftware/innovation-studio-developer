(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.user-preference')
        .factory('comExampleSamplelibraryUserPreferenceServices', function (RX_USER_PREFERENCES,
                                                                            COM_EXAMPLE_SAMPLE_LIBRARY_USER_PREFERENCE,
                                                                            rxUserPreferences) {
            // We create an object that we are going to use to access and save some information
            // in user preferences using rxUserPreferences api.
            function TestingUserPreferences(id) {
                var me = this;

                this.componentId = id;
                this.userPreferencePayload = {};
                // Version of the view component for example.
                this.userPreferencePayload[RX_USER_PREFERENCES.fields.version] = COM_EXAMPLE_SAMPLE_LIBRARY_USER_PREFERENCE.version;
                // Will contain the user preferences
                this.userPreferencePayload[RX_USER_PREFERENCES.fields.preferences] = {};
                // Component Name
                this.userPreferencePayload[RX_USER_PREFERENCES.fields.componentTypeName] = COM_EXAMPLE_SAMPLE_LIBRARY_USER_PREFERENCE.componentName;

                // This method is used to save the user preferences
                this.savePreference = function () {
                    return rxUserPreferences.setUiComponentPreferences(me.componentId, me.userPreferencePayload);
                };
            }

            // Adding additional methods to get and set preferences
            TestingUserPreferences.prototype = {
                // Getting user preferences
                getPreferences: function () {
                    var me = this;
                    var defaultPreferences = {};

                    // Here we create a "default" object with default values for each properties
                    defaultPreferences[COM_EXAMPLE_SAMPLE_LIBRARY_USER_PREFERENCE.colorProperty] = '';

                    // Getting existing user preferences for the view component
                    return rxUserPreferences
                        .getUiComponentPreferences(me.componentId)
                        .then(function (preferences) {
                            // Return existing user preferences if applicable or default values
                            preferences = _.defaults(preferences || {}, defaultPreferences);
                            me.userPreferencePayload[RX_USER_PREFERENCES.fields.preferences] = preferences;

                            return preferences;
                        })
                        .catch(function () {
                            // In case of error we return default values
                            return defaultPreferences;
                        });
                },

                // Saving the color in its property
                setColor: function (color) {
                    this.userPreferencePayload[RX_USER_PREFERENCES.fields.preferences][COM_EXAMPLE_SAMPLE_LIBRARY_USER_PREFERENCE.colorProperty] = color;

                    return this.savePreference();
                }
            };

            function getInstance(id) {
                return new TestingUserPreferences(id);
            }

            return {
                getInstance: getInstance
            };
        });
})();
