import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { QrCodeScannerComponent, QrCodeScannerModule } from './runtime';
import { QrCodeScannerDesignComponent, QrCodeScannerDesignModel, QrCodeScannerDesignModule } from './design';

// This view component leverages the npm library ngx-scanner:
// https://github.com/zxing-js/ngx-scanner
@NgModule({
  imports: [QrCodeScannerDesignModule, QrCodeScannerModule]
})
export class QrCodeScannerRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500QrCodeScanner',
      name: 'QR Code scanner',
      icon: 'left-qrcode',
      group: 'Test 21.05.00',
      componentFactory: this.componentFactoryResolver.resolveComponentFactory(QrCodeScannerComponent),
      options: {
        canBeEmbeddedInRecordEditor: true
      },
      // This view component does not have any input parameters.
      properties: [],
      designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(QrCodeScannerDesignComponent),
      designComponentModel: QrCodeScannerDesignModel,
      bundleId: 'com.example.test210500'
    });
  }
}
