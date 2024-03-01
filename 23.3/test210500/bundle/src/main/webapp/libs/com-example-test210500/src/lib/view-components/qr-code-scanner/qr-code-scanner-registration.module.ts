import { NgModule } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { QrCodeScannerComponent } from './runtime';
import { QrCodeScannerDesignComponent, QrCodeScannerDesignModel } from './design';

// This view component leverages the npm library ngx-scanner:
// https://github.com/zxing-js/ngx-scanner
@NgModule()
export class QrCodeScannerRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500QrCodeScanner',
      name: 'QR Code scanner',
      icon: 'left-qrcode',
      group: 'Test 21.05.00',
      component: QrCodeScannerComponent,
      options: {
        canBeEmbeddedInRecordEditor: true
      },
      // This view component does not have any input parameters.
      properties: [],
      designComponent: QrCodeScannerDesignComponent,
      designComponentModel: QrCodeScannerDesignModel
    });
  }
}
