(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.send-list')
        .directive('comExampleSamplelibrarySendList', function ($q,
                                                                rxNotificationMessage,
                                                                comExampleSamplelibrarySendListResource) {
            return {
                restrict: 'E',
                templateUrl: 'scripts/view-components/send-list/com-example-samplelibrary-send-list.directive.html',

                scope: {
                    rxConfiguration: '='
                },

                link: function ($scope) {
                    $scope.fetchInProgress = true;

                    // This is the payload sent to the backend.
                    // The Java code will automatically "cast" into a Java Class instance "Ticket".
                    // Here we put a List of objects (Javascript array) in NoteList.
                    // It will be casted into a List<Note> on the backend.
                    $scope.createTicketPayload = {
                        RECORDTYPE: 'EVENT',
                        NoteList: [
                        {
                            RECORDTYPE: 'NOTE',
                            title: 'Note 00'
                        },
                        {
                            RECORDTYPE: 'NOTE',
                            title: 'Note 11'
                        },
                        {
                            RECORDTYPE: 'NOTE',
                            title: 'Note 22'
                        },
                        {
                            RECORDTYPE: 'NOTE',
                            title: 'Note 33'
                        },
                        {
                            RECORDTYPE: 'NOTE',
                            title: 'Note 44'
                        },
                        {
                            RECORDTYPE: 'NOTE',
                            title: 'Note 55'
                        },
                        {
                            RECORDTYPE: 'NOTE',
                            title: 'Note 66'
                        },
                        {
                            RECORDTYPE: 'NOTE',
                            title: 'Note 77'
                        },
                        {
                            RECORDTYPE: 'NOTE',
                            title: 'Note 88'
                        },
                        {
                            RECORDTYPE: 'NOTE',
                            title: 'Note 99'
                        }
                    ],
                        title: 'ID011'
                    };

                    getSendData();

                    function getSendData() {
                        // $q.all allows you to query "n" rest apis and handle them when all those calls are "resolved".
                        // This avoids a chaining where you would call one rest api, then call the second one when the first one
                        // comes back etc...
                        $q.all({
                            getNote: comExampleSamplelibrarySendListResource.getNote('NOT0001'),
                            getTicket: comExampleSamplelibrarySendListResource.getTicket('TIC001'),
                            createTicket: comExampleSamplelibrarySendListResource.createTicket($scope.createTicketPayload)
                        }).then(function (data) {
                            // .plain() will only return the data and will strip the resource methods or objects.
                            $scope.getNoteData = data.getNote.plain();
                            $scope.getTicketData = data.getTicket.plain();
                            $scope.createTicketData = data.createTicket.plain();
                            $scope.fetchInProgress = false;
                            rxNotificationMessage.success('Information fetched successfully');
                        })
                            .catch(function (error) {
                                $scope.fetchInProgress = false;
                                rxNotificationMessage.error('Error calling the rest Api');
                            });
                    }
                }
            };
        });
})();
