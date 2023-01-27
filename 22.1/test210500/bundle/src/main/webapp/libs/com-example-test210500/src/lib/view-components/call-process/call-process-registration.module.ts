import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService, ViewComponentPropertyType } from '@helix/platform/view/api';
import { CallProcessComponent, CallProcessModule } from './runtime';
import { CallProcessDesignComponent, CallProcessDesignModel, CallProcessDesignModule } from './design';

// This view component looks a lot like "generate-password".
// The main difference is here instead of calling a custom rest api we
// are calling a process.
@NgModule({
  imports: [CallProcessDesignModule, CallProcessModule]
})
export class CallProcessRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500CallProcess',
      name: 'Call a Process',
      icon: 'atom_gear',
      group: 'Test 21.05.00',
      componentFactory: this.componentFactoryResolver.resolveComponentFactory(CallProcessComponent),
      properties: [
        {
          name: 'username',
          type: ViewComponentPropertyType.String
        }
      ],
      designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(CallProcessDesignComponent),
      designComponentModel: CallProcessDesignModel,
      bundleId: 'com.example.test210500'
    });
  }
}
