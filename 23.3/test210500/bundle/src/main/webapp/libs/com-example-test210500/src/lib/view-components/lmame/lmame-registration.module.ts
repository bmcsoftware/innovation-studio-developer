import { NgModule } from '@angular/core';
import { RxViewComponentRegistryService, ViewComponentPropertyType } from '@helix/platform/view/api';
import { LmameComponent } from './runtime';
import { LmameDesignComponent, LmameDesignModel } from './design';

@NgModule()
export class LmameRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500Lmame',
      name: 'Lmame',
      group: 'Test 21.05.00',
      component: LmameComponent,
      properties: [
        {
          name: 'lmame',
          type: ViewComponentPropertyType.String
        }
      ],
      designComponent: LmameDesignComponent,
      designComponentModel: LmameDesignModel
    });
  }
}
