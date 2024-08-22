import { Component, Input } from '@angular/core';
import { QrCodeGeneratorDesignModel } from './qr-code-generator-design.model';
// We need to import the SliderModule as we use the SliderComponent in the design model.
import { SliderModule } from '../../../inspectors/slider/slider.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'com-example-test210500-com-example-test210500-qr-code-generator-design',
  styleUrls: ['./qr-code-generator-design.scss'],
  templateUrl: './qr-code-generator-design.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, SliderModule]
})
export class QrCodeGeneratorDesignComponent {
  @Input()
  model: QrCodeGeneratorDesignModel;
}
