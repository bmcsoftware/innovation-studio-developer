import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService, ViewComponentPropertyType } from '@helix/platform/view/api';
import { CustomDatapagequeryComponent, CustomDatapagequeryModule } from './runtime';
import { CustomDatapagequeryDesignComponent, CustomDatapagequeryDesignModel, CustomDatapagequeryDesignModule } from './design';

@NgModule({
  imports: [CustomDatapagequeryDesignModule, CustomDatapagequeryModule]
})
export class CustomDatapagequeryRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500CustomDatapagequery',
      name: 'Consuming a custom datapagequery',
      icon: 'left-table_adapt',
      group: 'Test 21.05.00',
      componentFactory: this.componentFactoryResolver.resolveComponentFactory(CustomDatapagequeryComponent),
      properties: [
        {
          name: 'customDatapagequery',
          type: ViewComponentPropertyType.String
        }
      ],
      designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(CustomDatapagequeryDesignComponent),
      designComponentModel: CustomDatapagequeryDesignModel,
      bundleId: 'com.example.test210500'
    });
  }
}
