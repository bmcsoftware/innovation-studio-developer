import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseViewComponent, IViewComponent } from '@helix/platform/view/runtime';
import { BarcodeFormat } from '@zxing/library';
import { Alert, RxSelectionChangeEvent } from '@bmc-ux/adapt-angular';
import { first, forEach } from 'lodash';
import { CommonModule } from '@angular/common';
import { AdaptAlertModule, AdaptRxSelectModule } from '@bmc-ux/adapt-angular';
import { FormsModule } from '@angular/forms';
import { RxViewComponent } from '@helix/platform/view/api';
// Module used to scan qr codes.
import { ZXingScannerModule } from '@zxing/ngx-scanner';

// This view component leverages the npm library ngx-scanner:
// https://github.com/zxing-js/ngx-scanner
//
// Documentation:
// https://github.com/zxing-js/ngx-scanner/wiki
// Three npm modules are necessary (all MIT):
// npm i @zxing/browser@latest --save
// npm i @zxing/library@latest --save
// npm i @zxing/ngx-scanner@latest --save
//
// Note:
// It is VERY important to have those versions in the package.json
// as the latest @zxing/browser is bugged with Angular 10 and 11:
// "@zxing/browser": "0.0.5",
// "@zxing/library": "0.18.5",
// "@zxing/ngx-scanner": "3.1.3",
//
// Important note:
// If the website hosting this example has an IP address this component will not work properly as described in this GitHib issue:
// https://github.com/zxing-js/library/issues/225
// https://stackoverflow.com/questions/34197653/getusermedia-in-chrome-47-without-using-https/34198101#34198101
// This is due to web browser security enhancements that require SSL.
// If you want to test this example locally you might want to test your bundle in debug mode since localhost is as exception
// or on a system implementing SSL.
// If you have a system with an IP address there is a workaround you can try, it is to map localhost to the IP address.
// For example setting in your hosts file:
// <theWebsiteIp> localhost
// This could also be because you refused to let the web browser access the camera.
@Component({
  selector: 'com-example-test210500-com-example-test210500-qr-code-scanner',
  styleUrls: ['qr-code-scanner.component.scss'],
  templateUrl: './qr-code-scanner.component.html',
  standalone: true,
  imports: [CommonModule, ZXingScannerModule, AdaptAlertModule, AdaptRxSelectModule, FormsModule]
})
@RxViewComponent({
  name: 'comExampleTest210500QrCodeScanner'
})
export class QrCodeScannerComponent extends BaseViewComponent implements OnInit, IViewComponent {
  guid: string;
  config: Observable<any>;
  qrCodeScanner: string;

  // Adapt select (device list)
  selectedCamera: MediaDeviceInfo[] = null;
  deviceList: MediaDeviceInfo[] = [];

  // Adapt alert configuration
  alertContent = '';

  // We cannot set the configuration to null or the Adapt component will complain.
  alertConfiguration: Alert = {
    variant: 'info',
    title: '',
    content: ''
  };

  // Method to tell the Adapt select to display the device label
  optionFormatter(mediaDeviceInfo: MediaDeviceInfo) {
    return mediaDeviceInfo.label;
  }

  // Scanner component configuration
  isScanningEnabled = false;
  // We could allow more decoders.
  allowedFormats = [BarcodeFormat.QR_CODE, BarcodeFormat.EAN_13, BarcodeFormat.EAN_8, BarcodeFormat.CODE_39, BarcodeFormat.CODE_93, BarcodeFormat.DATA_MATRIX];
  selectedScanningDevice: any = null;
  zxingSelectedDevice: MediaDeviceInfo = null;

  ngOnInit() {
    this.alertConfiguration.title = 'Fetching device list.';
    this.alertContent = 'Please wait...';
  }

  onCamerasFound(cameraList: MediaDeviceInfo[]) {
    this.deviceList = [];

    // Generating the list of detected cameras and putting them in the Adapt
    // select component.
    if (cameraList) {
      forEach(cameraList, (camera: MediaDeviceInfo) => {
        this.deviceList.push(camera);
      });

      this.selectedCamera = [this.deviceList[0]];
      this.zxingSelectedDevice = this.selectedCamera[0];
      this.isScanningEnabled = true;
      this.alertContent = null;
    }
  }

  onCamerasNotFound() {
    this.alertConfiguration.variant = 'warning';
    this.alertConfiguration.title = 'No camera found.';
    this.alertContent = 'No camera found.';
  }

  onScanSuccess(qrCode: string) {
    // We have to do this in the case where the same qrcode is scanned and consumed by a record
    // editor field for example. If we delete the field content as the scanned value would be
    // the same the value would not be broadcasted anymore.
    // If we want to force the broadcast of the qr code only once, comment out the line below:
    this.notifyPropertyChanged('qrCode', null);
    // Broadcasting the output parameter with the qr code value.
    this.notifyPropertyChanged('qrCode', qrCode, null);
  }

  onScanError(error: Error) {
    this.alertConfiguration.variant = 'warning';
    this.alertConfiguration.title = 'Scan error';
    this.alertContent = String(error);
  }

  // During initialization the QR Code reader view component chooses the first available camera
  // and does not respect the one we set by default.
  onDeviceChange(cameraDevice: MediaDeviceInfo) {
    if (this.selectedCamera && this.selectedCamera[0].deviceId !== cameraDevice.deviceId) {
      this.zxingSelectedDevice = this.selectedCamera[0];
    }
  }

  // Adapt return the selected entry as an array of one element.
  onCameraSelected(selectedCamera: RxSelectionChangeEvent) {
    this.zxingSelectedDevice = first(selectedCamera.options);
  }

  // If the component has access to the camera system we will receive true.
  // Else there is a problem (no permission allowed or the IP issue / no SSL).
  // See note above.
  permissionResponse($event: boolean) {
    if ($event !== true) {
      this.alertConfiguration.variant = 'warning';
      this.alertConfiguration.title = 'User permission error or web browser permission error';

      this.alertContent = `If the website hosting this example has an IP address this component will not work properly as described in this GitHib issue:<br>
                        <a href="https://github.com/zxing-js/library/issues/225" target="_blank">Github</a><br>
                        <a href="https://stackoverflow.com/questions/34197653/getusermedia-in-chrome-47-without-using-https/34198101#34198101" target="_blank">Stack Overflow</a><br>
                        This is due to web browser security enhancements that require SSL.<br>
                        If you want to test this example locally you might want to test your bundle in debug mode since localhost is as exception<br>
                        or on a system implementing SSL.<br>
                        If you have a system with an IP address there is a workaround you can try, it is to map localhost to the IP address.<br>
                        For example setting in your hosts file:<br>
                        <theWebsiteIp> localhost<br>
                        This could also be because you refused to let the web browser access the camera.`;
    }
  }
}
