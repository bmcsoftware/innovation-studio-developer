import { NgModule } from '@angular/core';
import { SliderComponent } from './slider.component';
// The following modules are necessary because slider component use some Adapt components.
import { AdaptRxLabelModule, AdaptSliderModule } from '@bmc-ux/adapt-angular';
import { FormsModule } from '@angular/forms';

// Do not forget to import the module in the view component or action design module if you are using the component.

// This Component is designed to be used when defining a View Component or Action Input
// parameter in a design model.ts file.
// For example this Component is used in the view component QR Code generator.
@NgModule({
  declarations: [SliderComponent],
  entryComponents: [SliderComponent],
  exports: [SliderComponent],
  imports: [
    AdaptRxLabelModule,
    FormsModule,
    AdaptSliderModule
  ]
})
export class SliderModule {
}
