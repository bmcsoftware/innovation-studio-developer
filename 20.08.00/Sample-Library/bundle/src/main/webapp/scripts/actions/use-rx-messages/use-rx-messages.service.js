(function () {
    'use strict';
    // Service name is defined in use-rx-messages.config.js:
    // name: 'comExampleSamplelibraryUseRxMessagesAction',
    // This action does not return any value.

    // This code displays a popup and also returns a value to be used by another action.
    angular.module('com.example.samplelibrary.actions.use-rx-messages').service("comExampleSamplelibraryUseRxMessagesAction", function ($q,
                                                                                                                                        rxNotificationMessage) {
            return {
                // code executed at runtime.
                execute: function (message, type) {
                    // We display the message
                    switch (type) {
                        case "success":
                            rxNotificationMessage.success(message);
                            break;
                        case "error":
                            rxNotificationMessage.error(message);
                            break;
                        case "info":
                            rxNotificationMessage.info(message);
                            break;
                        case "warning":
                            rxNotificationMessage.warning(message);
                            break;
                        default:
                            rxNotificationMessage.info(message);
                            break;
                    }

                    // We do not return anything
                    return $q.when();
                }
            }
        }
    )
})();
