import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService, ViewComponentPropertyType } from '@helix/platform/view/api';
import { GeneratePasswordComponent, GeneratePasswordModule } from './runtime';
import { GeneratePasswordDesignComponent, GeneratePasswordDesignModel, GeneratePasswordDesignModule } from './design';

@NgModule({
  imports: [GeneratePasswordDesignModule, GeneratePasswordModule]
})
export class GeneratePasswordRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500GeneratePassword',
      name: 'Generate Password',
      icon: 'left-server_key',
      group: 'Test 21.05.00',
      componentFactory: this.componentFactoryResolver.resolveComponentFactory(GeneratePasswordComponent),
      // We have only one input parameter, the user name.
      // The output parameter (password) will be defined in the design model.
      properties: [
        {
          name: 'username',
          type: ViewComponentPropertyType.String
        }
      ],
      designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(GeneratePasswordDesignComponent),
      designComponentModel: GeneratePasswordDesignModel,
      bundleId: 'com.example.test210500'
    });
  }
}
