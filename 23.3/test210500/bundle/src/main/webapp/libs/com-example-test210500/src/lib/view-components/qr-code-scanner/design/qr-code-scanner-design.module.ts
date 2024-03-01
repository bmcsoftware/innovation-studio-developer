import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QrCodeScannerDesignComponent } from './qr-code-scanner-design.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [QrCodeScannerDesignComponent],
  entryComponents: [QrCodeScannerDesignComponent]
})
export class QrCodeScannerDesignModule {
}
