import { NgModule } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { OpenBladeComponent } from './runtime';
import { OpenBladeDesignComponent, OpenBladeDesignModel } from './design';
import { OpenViewActionModule } from '@helix/platform/view/actions';

@NgModule({
  imports: [OpenViewActionModule]
})
export class OpenBladeRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500OpenBlade',
      icon: 'left-windows_registry',
      name: 'Open Blade',
      group: 'Test 21.05.00',
      component: OpenBladeComponent,
      designComponent: OpenBladeDesignComponent,
      designComponentModel: OpenBladeDesignModel,
      properties: [
        {
          name: 'viewName'
        }
      ]
    });
  }
}
