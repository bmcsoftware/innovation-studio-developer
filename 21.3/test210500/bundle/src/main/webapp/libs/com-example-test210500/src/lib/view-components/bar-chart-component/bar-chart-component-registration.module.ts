import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { BarChartComponentComponent, BarChartComponentModule } from './runtime';
import { BarChartComponentDesignComponent, BarChartComponentDesignModel, BarChartComponentDesignModule } from './design';

@NgModule({
  imports: [BarChartComponentDesignModule, BarChartComponentModule]
})
export class BarChartComponentRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500BarChartComponent',
      name: 'Bar Chart',
      icon: 'chart_bar',
      group: 'Test 21.05.00',
      componentFactory: this.componentFactoryResolver.resolveComponentFactory(BarChartComponentComponent),
      properties: [],
      designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(BarChartComponentDesignComponent),
      designComponentModel: BarChartComponentDesignModel,
      bundleId: 'com.example.test210500'
    });
  }
}
