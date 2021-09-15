/**
 * This example is based on this question on BMC Communities:
 * https://communities.bmc.com/thread/207217
 *
 * It is using the qrcode reader module provided by zxing qr code reader 'https://github.com/zxing-js/'.
 * Example is coming from:
 * https://unpkg.com/@zxing/library@latest
 * https://stackoverflow.com/questions/62034678/how-can-i-scan-a-qr-code-from-a-webcam-using-zxing-in-js
 */
(function () {
    'use strict';

    angular.module('com.example.samplelibrary.view-components.qrcode-reader', [
        'com.bmc.arsys.rx.standardlib.view-component'
    ]);
})();
