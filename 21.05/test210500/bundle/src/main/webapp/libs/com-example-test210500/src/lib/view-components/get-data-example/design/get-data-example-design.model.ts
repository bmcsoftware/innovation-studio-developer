import {
  IViewComponentDesignSandbox,
  ViewDesignerComponentModel
} from '@helix/platform/view/designer';
import { IViewDesignerComponentModel } from '@helix/platform/view/api';
import { Injector } from '@angular/core';
import { IGetDataExampleParameters } from './get-data-example.interface';
import {
  ExpressionFormControlComponent,
  IExpressionFormControlOptions
} from '@helix/platform/shared/components';
import { Tooltip } from '@helix/platform/shared/api';

const initialComponentProperties: IGetDataExampleParameters = {
  gridObject: null,
  gridObjectAssociation: null
};

// In this example we do not implement design time validation.
// LMA:: TODO:: Change schematic?
//  We have to extend ViewDesignerComponentModel else we don't have access to this.expressionConfigurator later on.
export class GetDataExampleDesignModel extends ViewDesignerComponentModel implements IViewDesignerComponentModel<IGetDataExampleParameters> {
  constructor(protected injector: Injector,
              protected sandbox: IViewComponentDesignSandbox) {
    super(injector, sandbox);

    // Here we define the properties passed to the Inspector.
    // Those are not the default values.
    sandbox.updateInspectorConfig(this.setInspectorConfig(initialComponentProperties));
  }

  // Defines how the different input parameters are displayed in the View Component details
  // in View Designer.
  private setInspectorConfig(model) {
    return {
      inspectorSectionConfigs: [
        {
          label: 'General',
          controls: [
            {
              name: 'gridObject',
              component: ExpressionFormControlComponent,
              options: {
                label: 'Grid Object (for Record Instances)',
                tooltip: new Tooltip('Please select the grid to use to get record instance data.'),
                dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                operators: this.expressionConfigurator.getOperators(),
              } as IExpressionFormControlOptions
            },
            {
              name: 'gridObjectAssociation',
              component: ExpressionFormControlComponent,
              options: {
                label: 'Grid Object (for Associated data)',
                tooltip: new Tooltip('Please select the grid to use to get record associated data.'),
                dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                operators: this.expressionConfigurator.getOperators(),
              } as IExpressionFormControlOptions
            }
          ]
        }
      ]
    };
  }
}
