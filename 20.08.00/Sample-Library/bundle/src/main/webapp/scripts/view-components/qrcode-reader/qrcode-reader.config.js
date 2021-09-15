(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.qrcode-reader')
        .config(function (rxViewComponentProvider) {
            var accessGridDescriptor = {
                name: 'QR Code Reader',
                group: 'Sample Library Components',
                icon: 'qrcode',
                type: 'com-example-samplelibrary-qrcode-reader',
                designType: 'com-example-samplelibrary-qrcode-reader-design',
                bundleId: 'com.example.samplelibrary',

                propertiesByName: [
                    {
                        name: 'QrCode',    // This will be used to broadcast the captures qr code
                        type: 'string',
                        isConfig: false,
                        isProperty: true
                    }
                ]
            };

            rxViewComponentProvider.registerComponent(accessGridDescriptor);
        });
})();
