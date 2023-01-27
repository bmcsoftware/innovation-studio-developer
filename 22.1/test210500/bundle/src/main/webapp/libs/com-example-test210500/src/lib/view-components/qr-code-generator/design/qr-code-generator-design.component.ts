import { Component, Input } from '@angular/core';
import { QrCodeGeneratorDesignModel } from './qr-code-generator-design.model';

@Component({
  selector: 'com-example-test210500-com-example-test210500-qr-code-generator-design',
  styleUrls: ['./qr-code-generator-design.scss'],
  templateUrl: './qr-code-generator-design.component.html'
})
export class QrCodeGeneratorDesignComponent {
  @Input()
  model: QrCodeGeneratorDesignModel;
}
