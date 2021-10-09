import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { ListIconsComponent, ListIconsModule } from './runtime';
import { ListIconsDesignComponent, ListIconsDesignModel, ListIconsDesignModule } from './design';

// This view component will list the different icons you can use in your view components.
@NgModule({
  imports: [ListIconsDesignModule, ListIconsModule]
})
export class ListIconsRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500ListIcons',
      name: 'List available Icons',
      icon: 'lines_search',
      group: 'Test 21.05.00',
      componentFactory: this.componentFactoryResolver.resolveComponentFactory(ListIconsComponent),
      properties: [],
      designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(ListIconsDesignComponent),
      designComponentModel: ListIconsDesignModel,
      bundleId: 'com.example.test210500'
    });
  }
}
