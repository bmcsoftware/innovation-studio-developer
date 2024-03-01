import { NgModule } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { AccessGridComponent } from './runtime';
import { AccessGridDesignComponent, AccessGridDesignModel } from './design';

@NgModule()
export class AccessGridRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500AccessGrid',
      name: 'Accessing a grid object',
      icon: 'left-snap_to_grid',
      group: 'Test 21.05.00',
      component: AccessGridComponent,
      properties: [
        {
          // This input parameter will only be set by SetProperty in this example.
          // This input parameter will not be displayed in view designer.
          // To "Hide" it, we simply need to not specify it in the design model file.
          name: 'rowIndex',
          enableExpressionEvaluation: true
        },
        {
          // We will store in this property the grid "last refresh time"
          // which will indicate / change when the grid gets data.
          name: 'lastRefreshTime',
          enableExpressionEvaluation: true
        },
        {
          // Grid component.
          name: 'gridViewComponent',
          enableExpressionEvaluation: true
        }
      ],
      designComponent: AccessGridDesignComponent,
      designComponentModel: AccessGridDesignModel
    });
  }
}
