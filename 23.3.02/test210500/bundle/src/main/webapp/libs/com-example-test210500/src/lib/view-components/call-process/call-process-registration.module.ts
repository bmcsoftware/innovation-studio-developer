import { NgModule } from '@angular/core';
import { RxViewComponentRegistryService, ViewComponentPropertyType } from '@helix/platform/view/api';
import { CallProcessComponent } from './runtime';
import { CallProcessDesignComponent, CallProcessDesignModel } from './design';

// This view component looks a lot like "generate-password".
// The main difference is here instead of calling a custom rest api we
// are calling a process.
@NgModule()
export class CallProcessRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500CallProcess',
      name: 'Call a Process',
      icon: 'atom_gear',
      group: 'Test 21.05.00',
      component: CallProcessComponent,
      properties: [
        {
          name: 'username',
          type: ViewComponentPropertyType.String
        }
      ],
      designComponent: CallProcessDesignComponent,
      designComponentModel: CallProcessDesignModel
    });
  }
}
