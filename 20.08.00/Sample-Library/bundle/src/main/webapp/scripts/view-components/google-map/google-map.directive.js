(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.google-map').directive('comExampleSamplelibraryGoogleMap',
        function ($document,
                  $timeout,
                  rxGUID,
                  rxNotificationMessage) {
            return {
                restrict: 'E',
                templateUrl: 'scripts/view-components/google-map/com-example-samplelibrary-google-map.directive.html',

                scope: {
                    rxConfiguration: '='
                },

                link: function ($scope) {
                    var _config = $scope.rxConfiguration.propertiesByName,
                        address = _config.address,
                        googleMapApiKey = _config.googleMapApiKey,
                        googleMapsScriptUrl = 'https://maps.googleapis.com/maps/api/js?key=' + googleMapApiKey,
                        googleMapSize = _config.size ? _config.size + 'px' : '300px',
                        isGoogleMapsInitialized = false,
                        canvasElement,
                        map,
                        geocoder;

                    // We are generating a dynamic class name in case we put several map fields in a single view.
                    // This way each instance of the view component can be found and is unique.
                    // We are using rxGuid to generate a guid, beginning by 'googlemaps' string.
                    $scope.canvasName = 'map_canvas_' + rxGUID.generate('googlemaps');

                    // If the object with class $scope.canvasName is found in the DOM then we initialize Google Maps.
                    // Else we wait a bit and try again.
                    function initializeGoogleMapsCanvas() {
                        // Trying to find the object <div class="{{canvasName}} default-size"></div> in the DOM
                        if (!_.first($document.find('.' + $scope.canvasName))) {
                            $timeout(initializeGoogleMapsCanvas, 500);
                        } else {
                            canvasElement = _.first($document.find('.' + $scope.canvasName));

                            // Loading the Google Maps script, when loaded we initialize the Google Map object.
                            $.getScript(googleMapsScriptUrl, function () {
                                canvasElement.style.height = googleMapSize;
                                canvasElement.style.width = googleMapSize;

                                // Creating the Google Map object and geolocalizing the first address if necessary.
                                // Google Map default options
                                var googleMapDefaultOptions = {
                                    zoom: 8,
                                    center: {
                                        lat: -34.397,
                                        lng: 150.644
                                    },
                                    mapTypeId: google.maps.MapTypeId.ROADMAP,
                                    scrollwheel: false
                                };

                                map = new google.maps.Map(canvasElement, googleMapDefaultOptions);
                                geocoder = new google.maps.Geocoder();

                                // Using Google Maps Geocoder api to localize the address
                                if (address) {
                                    geocodeAddress(geocoder, map, address);
                                }

                                isGoogleMapsInitialized = true;
                            });
                        }
                    }

                    // Geolocalizing the address using Google Maps geolocator apis.
                    function geocodeAddress(geocoder, resultsMap, address) {
                        geocoder.geocode({'address': address}, function (results, status) {
                            if (status === google.maps.GeocoderStatus.OK) {
                                resultsMap.setCenter(results[0].geometry.location);
                                setMarker(resultsMap, results[0].geometry.location, address);
                            } else {
                                rxNotificationMessage.warning('Geocode was not successful for the following reason: ' + status);
                            }
                        });
                    }

                    // Setting the marker on the Google Map.
                    function setMarker(map, position, content) {
                        var markerOptions = {
                            position: position,
                            map: map,
                            icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
                        };

                        var marker = new google.maps.Marker(markerOptions),
                            infoWindow;

                        google.maps.event.addListener(marker, 'click', function () {
                            // close window if not undefined
                            if (infoWindow !== void 0) {
                                infoWindow.close();
                            }
                            // create new window
                            var infoWindowOptions = {
                                content: content
                            };

                            infoWindow = new google.maps.InfoWindow(infoWindowOptions);
                            infoWindow.open(map, marker);
                        });
                    }

                    // Checking if the address changed. If so we load and locate the new address.
                    $scope.$watch('rxConfiguration.propertiesByName.address', function () {
                        address = _config.address;

                        if (isGoogleMapsInitialized && address) {
                            geocodeAddress(geocoder, map, address);
                        }
                    });

                    // Launching Google Maps initialization
                    if (!googleMapApiKey) {
                        rxNotificationMessage.error('Please provide a Google Map API Key to use this example.')
                    } else {
                        initializeGoogleMapsCanvas();
                    }
                }
            };
        });
})();