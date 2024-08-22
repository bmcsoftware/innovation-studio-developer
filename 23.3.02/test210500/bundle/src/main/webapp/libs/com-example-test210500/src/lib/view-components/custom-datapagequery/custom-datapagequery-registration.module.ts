import { NgModule } from '@angular/core';
import { RxViewComponentRegistryService, ViewComponentPropertyType } from '@helix/platform/view/api';
import { CustomDatapagequeryComponent } from './runtime';
import { CustomDatapagequeryDesignComponent, CustomDatapagequeryDesignModel } from './design';

@NgModule()
export class CustomDatapagequeryRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500CustomDatapagequery',
      name: 'Consuming a custom datapagequery',
      icon: 'left-table_adapt',
      group: 'Test 21.05.00',
      component: CustomDatapagequeryComponent,
      properties: [
        {
          name: 'customDatapagequery',
          type: ViewComponentPropertyType.String
        }
      ],
      designComponent: CustomDatapagequeryDesignComponent,
      designComponentModel: CustomDatapagequeryDesignModel
    });
  }
}
