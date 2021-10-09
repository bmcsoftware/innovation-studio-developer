import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { QrCodeGeneratorDesignComponent } from './qr-code-generator-design.component';
// We need to import the SliderModule as we use the SliderComponent in the design model.
import { SliderModule } from '../../../inspectors/slider/slider.module';

@NgModule({
  imports: [CommonModule, FormsModule, SliderModule],
  declarations: [QrCodeGeneratorDesignComponent],
  entryComponents: [QrCodeGeneratorDesignComponent]
})
export class QrCodeGeneratorDesignModule {
}
