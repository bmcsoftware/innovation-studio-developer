import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DisplayGradientDesignComponent } from './display-gradient-design.component';
import { GradientModule } from '../../../inspectors/gradient/gradient.module';

@NgModule({
  imports: [CommonModule, FormsModule, GradientModule],
  declarations: [DisplayGradientDesignComponent],
  entryComponents: [DisplayGradientDesignComponent]
})
export class DisplayGradientDesignModule {
}
