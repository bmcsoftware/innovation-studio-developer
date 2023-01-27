import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService, ViewComponentPropertyType } from '@helix/platform/view/api';
import { LmameComponent, LmameModule } from './runtime';
import { LmameDesignComponent, LmameDesignModel, LmameDesignModule } from './design';

@NgModule({
  imports: [LmameDesignModule, LmameModule]
})
export class LmameRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500Lmame',
      name: 'Lmame',
      group: 'Test 21.05.00',
      componentFactory: this.componentFactoryResolver.resolveComponentFactory(LmameComponent),
      properties: [
        {
          name: 'lmame',
          type: ViewComponentPropertyType.String
        }
      ],
      designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(LmameDesignComponent),
      designComponentModel: LmameDesignModel,
      bundleId: 'com.example.test210500'
    });
  }
}
