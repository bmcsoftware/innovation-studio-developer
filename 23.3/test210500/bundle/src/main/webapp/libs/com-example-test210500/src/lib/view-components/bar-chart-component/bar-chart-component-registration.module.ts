import {  NgModule } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { BarChartComponentComponent } from './runtime';
import { BarChartComponentDesignComponent, BarChartComponentDesignModel } from './design';

@NgModule()
export class BarChartComponentRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500BarChartComponent',
      name: 'Bar Chart',
      icon: 'chart_bar',
      group: 'Test 21.05.00',
      component: BarChartComponentComponent,
      properties: [],
      designComponent: BarChartComponentDesignComponent,
      designComponentModel: BarChartComponentDesignModel
    });
  }
}
