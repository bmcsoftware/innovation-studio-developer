import { Component, Input } from '@angular/core';
import { DigitalSignatureDesignModel } from './digital-signature-design.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'com-example-test210500-com-example-test210500-digital-signature-design',
  styleUrls: ['./digital-signature-design.scss'],
  templateUrl: './digital-signature-design.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule]
})
export class DigitalSignatureDesignComponent {
  @Input()
  model: DigitalSignatureDesignModel;
}
