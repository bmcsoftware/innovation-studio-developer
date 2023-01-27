import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DisplayGradientComponent } from './display-gradient.component';
import { GradientModule } from '../../../inspectors/gradient/gradient.module';

@NgModule({
  imports: [CommonModule, GradientModule],
  exports: [DisplayGradientComponent],
  declarations: [DisplayGradientComponent],
  entryComponents: [DisplayGradientComponent]
})
export class DisplayGradientModule {
}
