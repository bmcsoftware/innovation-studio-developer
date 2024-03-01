import { NgModule } from '@angular/core';
import { RxViewComponentRegistryService, ViewComponentPropertyType } from '@helix/platform/view/api';
import { GeneratePasswordComponent } from './runtime';
import { GeneratePasswordDesignComponent, GeneratePasswordDesignModel } from './design';

@NgModule()
export class GeneratePasswordRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500GeneratePassword',
      name: 'Generate Password',
      icon: 'left-server_key',
      group: 'Test 21.05.00',
      component: GeneratePasswordComponent,
      // We have only one input parameter, the user name.
      // The output parameter (password) will be defined in the design model.
      properties: [
        {
          name: 'username',
          type: ViewComponentPropertyType.String
        }
      ],
      designComponent: GeneratePasswordDesignComponent,
      designComponentModel: GeneratePasswordDesignModel
    });
  }
}
