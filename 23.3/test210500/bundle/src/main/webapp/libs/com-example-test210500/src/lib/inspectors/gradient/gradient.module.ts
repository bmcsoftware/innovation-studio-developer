import { NgModule } from '@angular/core';
import { GradientComponent } from './gradient.component';
import { GradientService } from './gradient.service';
// The following modules are necessary because gradient component use some Adapt components.
import { AdaptColorPickerModule, AdaptRxLabelModule } from '@bmc-ux/adapt-angular';
import { FormsModule } from '@angular/forms';

// Do not forget to import the module in the view component or action design module if you are using the component.

// This Component is designed to be used when defining a View Component or Action Input
// parameter in a design model.ts file.
// For example this Component is used in the Action fruit-picker and the View Component
// display-gradient.
@NgModule({
  declarations: [GradientComponent],
  entryComponents: [GradientComponent],
  exports: [GradientComponent],
  // We provide the service as we import the GradientModule in some other
  // view components and actions.
  providers: [GradientService],
  imports: [
    AdaptRxLabelModule,
    AdaptColorPickerModule,
    FormsModule
  ]
})
export class GradientModule {
}
