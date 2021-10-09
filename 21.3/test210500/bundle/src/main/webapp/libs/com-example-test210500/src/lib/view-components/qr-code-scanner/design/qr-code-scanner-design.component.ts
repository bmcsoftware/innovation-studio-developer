import { Component, Input } from '@angular/core';
import { QrCodeScannerDesignModel } from './qr-code-scanner-design.model';

@Component({
  selector: 'com-example-test210500-com-example-test210500-qr-code-scanner-design',
  styleUrls: ['./qr-code-scanner-design.scss'],
  templateUrl: './qr-code-scanner-design.component.html'
})
export class QrCodeScannerDesignComponent {
  @Input()
  model: QrCodeScannerDesignModel;
}
