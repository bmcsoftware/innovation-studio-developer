import { Component, Input } from '@angular/core';
import { QrCodeScannerDesignModel } from './qr-code-scanner-design.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'com-example-test210500-com-example-test210500-qr-code-scanner-design',
  styleUrls: ['./qr-code-scanner-design.scss'],
  templateUrl: './qr-code-scanner-design.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class QrCodeScannerDesignComponent {
  @Input()
  model: QrCodeScannerDesignModel;
}
