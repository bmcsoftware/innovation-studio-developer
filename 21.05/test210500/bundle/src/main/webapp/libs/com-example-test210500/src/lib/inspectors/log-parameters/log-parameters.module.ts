import { NgModule } from '@angular/core';
import { LogParametersComponent } from './log-parameters.component';
import { AdaptButtonModule, AdaptCodeViewerModule, AdaptRxLabelModule } from '@bmc-ux/adapt-angular';
import { CommonModule } from '@angular/common';

// Do not forget to import the module in the view component or action design module if you are using the component.

// This Component is designed to be used when defining a View Component or Action Input
// parameter in a design model.ts file.
// This Component is designed to subscribe to a View Component or Action input parameters.
// It could temporarily be used during a View Component or Action development phase,
// displaying the input parameter values in a JSON format.
// As an example it will be used in the View Component "test-debug-component" view component.
@NgModule({
  declarations: [LogParametersComponent],
  entryComponents: [LogParametersComponent],
  exports: [LogParametersComponent],
  imports: [
    CommonModule,
    AdaptRxLabelModule,
    AdaptButtonModule,
    AdaptCodeViewerModule
  ]
})
export class LogParametersModule {
}
