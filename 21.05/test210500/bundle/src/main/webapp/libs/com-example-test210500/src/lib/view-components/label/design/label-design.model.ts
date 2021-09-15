import { IViewComponentDesignSandbox } from '@helix/platform/view/designer';
import { IViewDesignerComponentModel } from '@helix/platform/view/api';
import { TextFormControlComponent } from '@helix/platform/shared/components';
import { IExpressionConfigurator } from '@helix/platform/shared/api';
import { Injector } from '@angular/core';

export class LabelDesignModel implements IViewDesignerComponentModel {
  // This is mandatory even when not used else the code would not compile.
  expressionConfigurator: IExpressionConfigurator;

  // This is mandatory even when not used else the code would not compile.
  // We need to pass the injector and sandbox.
  constructor(private injector: Injector, public sandbox: IViewComponentDesignSandbox) {
    const initialComponentProperties = {
      label: 'New Label'
    };

    // Getting the input parameter configuration.
    sandbox.updateInspectorConfig(this.getInspector(initialComponentProperties));
  }

  private getInspector(model) {
    return {
      inspectorSectionConfigs: [
        {
          label: 'General',
          controls: [
            {
              name: 'label',
              component: TextFormControlComponent,
              options: {
                label: 'label'
              }
            }
          ]
        }
      ]
    };
  }
}
