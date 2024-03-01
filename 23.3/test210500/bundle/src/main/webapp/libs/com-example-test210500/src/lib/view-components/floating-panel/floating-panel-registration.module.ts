import { NgModule } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { FloatingPanelComponent } from './runtime';
import { FloatingPanelDesignComponent, FloatingPanelDesignModel } from './design';

// This example uses the library jsPanel (https://jspanel.de/) and allows the display of a view
// inside a panel object.
@NgModule()
export class FloatingPanelRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500FloatingPanel',
      name: 'Floating Panel',
      icon: 'left-tablet',
      group: 'Test 21.05.00',
      component: FloatingPanelComponent,
      properties: [
        {
          name: 'viewName'
        },
        {
          name: 'panelTitle',
          enableExpressionEvaluation: true
        },
        {
          name: 'panelIdentifier',
          enableExpressionEvaluation: true
        }
      ],
      designComponent: FloatingPanelDesignComponent,
      designComponentModel: FloatingPanelDesignModel
    });
  }
}
