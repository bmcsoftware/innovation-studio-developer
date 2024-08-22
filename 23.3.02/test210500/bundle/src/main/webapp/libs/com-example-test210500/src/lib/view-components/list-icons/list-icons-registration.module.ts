import { NgModule } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { ListIconsComponent } from './runtime';
import { ListIconsDesignComponent, ListIconsDesignModel } from './design';

// This view component will list the different icons you can use in your view components.
@NgModule()
export class ListIconsRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500ListIcons',
      name: 'List available Icons',
      icon: 'lines_search',
      group: 'Test 21.05.00',
      component: ListIconsComponent,
      properties: [],
      designComponent: ListIconsDesignComponent,
      designComponentModel: ListIconsDesignModel
    });
  }
}
