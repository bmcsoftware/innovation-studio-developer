import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { AccessGridComponent, AccessGridModule } from './runtime';
import { AccessGridDesignComponent, AccessGridDesignModel, AccessGridDesignModule } from './design';

@NgModule({
  imports: [AccessGridDesignModule, AccessGridModule]
})
export class AccessGridRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500AccessGrid',
      name: 'Accessing a grid object',
      icon: 'left-snap_to_grid',
      group: 'Test 21.05.00',
      componentFactory: this.componentFactoryResolver.resolveComponentFactory(AccessGridComponent),
      properties: [
        {
          // This input parameter will only be set by SetProperty in this example.
          // This input parameter will not be displayed in view designer.
          // To "Hide" it, we simply need to not specify it in the design model file.
          name: 'rowIndex',
          enableExpressionEvaluation: true
        },
        {
          // LMA:: TODO:: As the grid object does not expose the necessary apis to
          // access the data or object to select a row for example
          // we add a specific class in the grid we want to access to
          // and we will search for it in the DOM.
          // Once the class is added to the grid in view designer, refer
          // the class name in this Input Parameter.
          name: 'gridCssClassTag',
          enableExpressionEvaluation: true
        },
        {
          // LMA:: TODO:: This parameter is pretty useless for now as we cannot access
          // the inner apis to select a row for example.
          name: 'gridViewComponent',
          enableExpressionEvaluation: true
        }
      ],
      designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(AccessGridDesignComponent),
      designComponentModel: AccessGridDesignModel,
      bundleId: 'com.example.test210500'
    });
  }
}
