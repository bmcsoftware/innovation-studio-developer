import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService, ViewComponentPropertyType } from '@helix/platform/view/api';
import { LifecycleComponent, LifecycleModule } from './runtime';
import { LifecycleDesignComponent, LifecycleDesignModel, LifecycleDesignModule } from './design';

@NgModule({
  imports: [LifecycleDesignModule, LifecycleModule]
})
export class LifecycleRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {3
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500Lifecycle',
      name: 'lifecycle',
      icon: 'arrows_cycle',
      group: 'Test 21.05.00',
      componentFactory: this.componentFactoryResolver.resolveComponentFactory(LifecycleComponent),
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
      designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(LifecycleDesignComponent),
      designComponentModel: LifecycleDesignModel,
      bundleId: 'com.example.test210500'
    });
  }
}
