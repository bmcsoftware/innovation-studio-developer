import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService, ViewComponentPropertyType } from '@helix/platform/view/api';
import { LabelComponent, LabelModule } from './runtime';
import { LabelDesignComponent, LabelDesignModel, LabelDesignModule } from './design';

// This example leverages the Numerical NPM library.
// https://www.npmjs.com/package/numeral
@NgModule({
  imports: [LabelDesignModule, LabelModule]
})
export class LabelRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500Label',
      name: 'Default view component for test210500.com-example-test210500 (label)',
      group: 'Test 21.05.00',
      componentFactory: this.componentFactoryResolver.resolveComponentFactory(LabelComponent),
      properties: [
        {
          name: 'label',
          type: ViewComponentPropertyType.String
        }
      ],
      designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(LabelDesignComponent),
      designComponentModel: LabelDesignModel,
      bundleId: 'com.example.test210500'
    });
  }
}
