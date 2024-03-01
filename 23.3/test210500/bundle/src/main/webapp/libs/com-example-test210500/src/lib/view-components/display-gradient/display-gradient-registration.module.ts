import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { DisplayGradientComponent, DisplayGradientModule } from './runtime';
import { DisplayGradientDesignComponent, DisplayGradientDesignModel, DisplayGradientDesignModule } from './design';

// This example is pretty simple and aims to show how to leverage custom field inspectors (component)
// in the attribute configuration.
// Here the "gradient" input parameter will leverage the custom component "GradientComponent:
// created initially for the fruit-picker action.
@NgModule({
  imports: [DisplayGradientDesignModule, DisplayGradientModule]
})
export class DisplayGradientRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500DisplayGradient',
      name: 'Display Gradient',
      icon: 'colorpicker',
      group: 'Test 21.05.00',
      options: {
        canBeEmbeddedInRecordEditor: true
      },
      componentFactory: this.componentFactoryResolver.resolveComponentFactory(DisplayGradientComponent),
      properties: [
        // The gradient will use a custom inspector previously created for the
        // action fruit-picker.
        // Its configuration will be detailed in the design.model.ts.
        {
          name: 'gradient'
        }
      ],
      designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(DisplayGradientDesignComponent),
      designComponentModel: DisplayGradientDesignModel,
      bundleId: 'com.example.test210500'
    });
  }
}
