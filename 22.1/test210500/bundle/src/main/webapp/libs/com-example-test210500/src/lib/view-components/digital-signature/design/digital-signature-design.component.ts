import { Component, Input } from '@angular/core';
import { DigitalSignatureDesignModel } from './digital-signature-design.model';

@Component({
  selector: 'com-example-test210500-com-example-test210500-digital-signature-design',
  styleUrls: ['./digital-signature-design.scss'],
  templateUrl: './digital-signature-design.component.html'
})
export class DigitalSignatureDesignComponent {
  @Input()
  model: DigitalSignatureDesignModel;
}
