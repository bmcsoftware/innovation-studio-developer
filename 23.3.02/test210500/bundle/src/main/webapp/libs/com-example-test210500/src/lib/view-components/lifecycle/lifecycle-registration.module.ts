import { NgModule } from '@angular/core';
import { RxViewComponentRegistryService, ViewComponentPropertyType } from '@helix/platform/view/api';
import { LifecycleComponent } from './runtime';
import { LifecycleDesignComponent, LifecycleDesignModel } from './design';

@NgModule()
export class LifecycleRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500Lifecycle',
      name: 'lifecycle',
      icon: 'arrows_cycle',
      group: 'Test 21.05.00',
      component: LifecycleComponent,
      properties: [
        {
          name: 'recordDefinitionName',
          type: ViewComponentPropertyType.String
        },
        {
          name: 'selectionFieldId',
          type: ViewComponentPropertyType.String
        },
        {
          name: 'selectionValue',
          enableExpressionEvaluation: true
        },
        {
          name: 'statusList'
        }
      ],
      designComponent: LifecycleDesignComponent,
      designComponentModel: LifecycleDesignModel
    });
  }
}
