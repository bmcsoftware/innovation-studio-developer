import { NgModule } from '@angular/core';
import { QrCodeScannerComponent } from './qr-code-scanner.component';
import { CommonModule } from '@angular/common';
import { AdaptAlertModule, AdaptRxSelectModule } from '@bmc-ux/adapt-angular';
import { FormsModule } from '@angular/forms';
// Module used to scan qr codes.
import { ZXingScannerModule } from '@zxing/ngx-scanner';

// This view component leverages the npm library ngx-scanner:
// https://github.com/zxing-js/ngx-scanner
@NgModule({
  imports: [CommonModule, ZXingScannerModule, AdaptAlertModule, AdaptRxSelectModule, FormsModule],
  exports: [QrCodeScannerComponent],
  declarations: [QrCodeScannerComponent],
  entryComponents: [QrCodeScannerComponent]
})
export class QrCodeScannerModule {
}
