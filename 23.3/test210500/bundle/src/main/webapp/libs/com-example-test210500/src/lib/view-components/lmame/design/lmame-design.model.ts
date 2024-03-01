import { IViewComponentDesignSandbox } from '@helix/platform/view/designer';
import { IViewDesignerComponentModel } from '@helix/platform/view/api';
import { TextFormControlComponent } from '@helix/platform/shared/components';
import { Injector } from '@angular/core';
import { IExpressionConfigurator } from '@helix/platform/shared/api';

export class LmameDesignModel implements IViewDesignerComponentModel {
  // This is mandatory even when not used else the code would not compile.
  expressionConfigurator: IExpressionConfigurator;

  // This is mandatory even when not used else the code would not compile.
  // We need to pass the injector and sandbox.
  constructor(private injector: Injector, public sandbox: IViewComponentDesignSandbox) {
    const initialComponentProperties = {
      lmame: ''
    };

    sandbox.updateInspectorConfig(this.getInspector(initialComponentProperties));
  }

  private getInspector(model) {
    return {
      inspectorSectionConfigs: [
        {
          label: 'General',
          controls: [
            {
              name: 'lmame',
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
