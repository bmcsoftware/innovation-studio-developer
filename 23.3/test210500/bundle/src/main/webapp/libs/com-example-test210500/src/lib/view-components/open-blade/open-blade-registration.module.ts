import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { OpenBladeComponent, OpenBladeModule } from './runtime';
import { OpenBladeDesignComponent, OpenBladeDesignModel, OpenBladeDesignModule } from './design';
import { OpenViewActionModule } from '@helix/platform/view/actions';

@NgModule({
  imports: [OpenBladeDesignModule, OpenBladeModule, OpenViewActionModule]
})
export class OpenBladeRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500OpenBlade',
      icon: 'left-windows_registry',
      name: 'Open Blade',
      group: 'Test 21.05.00',
      componentFactory: this.componentFactoryResolver.resolveComponentFactory(OpenBladeComponent),
      designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(OpenBladeDesignComponent),
      designComponentModel: OpenBladeDesignModel,
      bundleId: 'com.example.test210500',
      properties: [
        {
          name: 'viewName'
        }
      ]
    });
  }
}
