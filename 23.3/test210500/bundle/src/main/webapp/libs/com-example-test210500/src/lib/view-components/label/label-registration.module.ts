import { NgModule } from '@angular/core';
import { RxViewComponentRegistryService, ViewComponentPropertyType } from '@helix/platform/view/api';
import { LabelComponent } from './runtime';
import { LabelDesignComponent, LabelDesignModel } from './design';

// This example leverages the Numerical NPM library.
// https://www.npmjs.com/package/numeral
@NgModule()
export class LabelRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500Label',
      name: 'Default view component for test210500.com-example-test210500 (label)',
      group: 'Test 21.05.00',
      component: LabelComponent,
      properties: [
        {
          name: 'label',
          type: ViewComponentPropertyType.String
        }
      ],
      designComponent: LabelDesignComponent,
      designComponentModel: LabelDesignModel
    });
  }
}
