/*
The Resources return a promise.
 */

(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.send-list').factory('comExampleSamplelibrarySendListResource', function (COM_EXAMPLE_SAMPLE_LIBRARY_SEND_LIST,
                                                                                                                                       rxResource,
                                                                                                                                       rxString) {
        // rxResource is to call a custom Java API
        var _resource = rxResource.withSubUrlConfiguration(COM_EXAMPLE_SAMPLE_LIBRARY_SEND_LIST.restUrl, function (RestangularConfigurer) {
            RestangularConfigurer.setRestangularFields({'id': 'name'});
        });

        var _postResource = rxResource.withSubUrlConfiguration(rxString.format('%s/%s', COM_EXAMPLE_SAMPLE_LIBRARY_SEND_LIST.restUrl, 'ticket'), function (RestangularConfigurer) {
            RestangularConfigurer.setRestangularFields({'id': 'name'});
        });

        function getNote(noteId) {
            return _resource.get(rxString.format('note/%s', noteId));
        }

        function getTicket(ticketId) {
            return _resource.get(rxString.format('ticket/%s', ticketId));
        }

        function createTicket(ticket) {
            return _postResource.post(ticket);
        }

        return {
            createTicket: createTicket,
            getNote: getNote,
            getTicket: getTicket
        };
    });
})();