import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { FloatingPanelComponent, FloatingPanelModule } from './runtime';
import { FloatingPanelDesignComponent, FloatingPanelDesignModel, FloatingPanelDesignModule } from './design';

// This example uses the library jsPanel (https://jspanel.de/) and allows the display of a view
// inside a panel object.
@NgModule({
  imports: [FloatingPanelDesignModule, FloatingPanelModule]
})
export class FloatingPanelRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500FloatingPanel',
      name: 'Floating Panel',
      icon: 'left-tablet',
      group: 'Test 21.05.00',
      componentFactory: this.componentFactoryResolver.resolveComponentFactory(FloatingPanelComponent),
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
      designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(FloatingPanelDesignComponent),
      designComponentModel: FloatingPanelDesignModel,
      bundleId: 'com.example.test210500'
    });
  }
}
