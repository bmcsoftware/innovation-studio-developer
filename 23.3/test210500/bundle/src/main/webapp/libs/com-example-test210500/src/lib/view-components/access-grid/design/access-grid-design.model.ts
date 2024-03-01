import {
  IViewComponentDesignCommonDataDictionaryBranch,
  IViewComponentDesignSandbox, IViewComponentDesignValidationIssue,
  ViewDesignerComponentModel
} from '@helix/platform/view/designer';
import { IViewDesignerComponentModel } from '@helix/platform/view/api';
import {
  ExpressionFormControlComponent,
  IExpressionFormControlOptions,
} from '@helix/platform/shared/components';
import { Injector } from '@angular/core';
import { IAccessGridParameters } from './access-grid.interface';
import { Tooltip } from '@helix/platform/shared/api';
import { IViewComponentDesignSettablePropertiesDataDictionary } from '@helix/platform/view/designer/public-interfaces/view-component-design-settable-properties-data-dictionary.interfaces';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

const initialComponentProperties: IAccessGridParameters = {
  gridViewComponent: null,
  rowIndex: '',
  lastRefreshTime: ''
};

export class AccessGridDesignModel extends ViewDesignerComponentModel implements IViewDesignerComponentModel<IAccessGridParameters> {
  constructor(protected injector: Injector,
              protected sandbox: IViewComponentDesignSandbox) {
    super(injector, sandbox);

    const componentName = this.sandbox.descriptor.name;

    // Registering the output parameters.
    this.sandbox.setCommonDataDictionary(this.prepareDataDictionary(this.sandbox.descriptor.name));

    // Setting the properties that can be set through a button action "Set Property".
    // In our use case we will provide the row to select in the grid.
    this.sandbox.setSettablePropertiesDataDictionary(componentName, this.prepareSetProperties());

    // Here we define the properties passed to the Inspector.
    // Those are not the default values.
    sandbox.updateInspectorConfig(this.setInspectorConfig(initialComponentProperties));

    // Registering the custom validation.
    combineLatest([this.sandbox.componentProperties$])
      .pipe(
        map(([componentProperties]) => {
          return this.validate(this.sandbox, componentProperties as IAccessGridParameters);
        })
      )
      .subscribe((validationIssues) => {
        this.sandbox.setValidationIssues(validationIssues);
      });
  }

  // Setting default values and saved values to be displayed in the field properties.
  // This method is called automatically.
  static getInitialProperties(initialProperties?: IAccessGridParameters): IAccessGridParameters {
    return {
      // Input parameters default values.
      gridViewComponent: null,
      rowIndex: '',
      lastRefreshTime:'',
      // Values already saved in View Designer for this field (if any).
      ...initialProperties
    }
  }

  // Creating the inspector, detailing the input parameters.
  private setInspectorConfig(model) {
    return {
      inspectorSectionConfigs: [
        {
          label: 'General',
          controls: [
            {
              name: 'lastRefreshTime',
              component: ExpressionFormControlComponent,
              options: {
                label: 'Grid Last Refresh Time',
                tooltip: new Tooltip(`We will store in this property the grid "last refresh time"<br>
                          which will indicate / change when the grid gets data.<br>
                          This will serve as an event to tell us the grid has loaded new data.`),
                dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                operators: this.expressionConfigurator.getOperators(),
                isRequired: true
              } as IExpressionFormControlOptions
            },
            {
              // Grid component.
              name: 'gridViewComponent',
              component: ExpressionFormControlComponent,
              options: {
                label: 'Grid Object',
                dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                operators: this.expressionConfigurator.getOperators(),
                isRequired: true
              } as IExpressionFormControlOptions
            }
          ]
        }
      ]
    };
  }

  // Preparing the settable properties, aka the properties that can be set
  // through a button action "set property".
  // In our case we want to pass the row index to select.
  private prepareSetProperties(): IViewComponentDesignSettablePropertiesDataDictionary {
    return [
      {
        label: 'Row index',
        expression: this.getExpressionForProperty('rowIndex'),
      }
    ];
  }

  // We need one output parameter in order to use SetProperty on one input parameter.
  private prepareDataDictionary(componentName: string): IViewComponentDesignCommonDataDictionaryBranch {
    return {
      label: componentName,
      expression: this.getExpressionForProperty('api'),
      children: [
        {
          label: 'Grid Data',
          expression: this.getExpressionForProperty('gridData')
        }
      ]
    }
  }

  // Design time validation. The "model" contains the stepList (all steps).
  private validate(
    sandbox: IViewComponentDesignSandbox,
    model: IAccessGridParameters
  ): IViewComponentDesignValidationIssue[] {
    const validationIssues = [];

    // The model contains the input parameter values.
    if (!model.lastRefreshTime) {
      validationIssues.push(sandbox.createError('The Grid Last refresh time property is required.', 'gridCssClassTag'));
    }

    if (!model.gridViewComponent) {
      validationIssues.push(sandbox.createError('The Grid Component Object is required.', 'gridViewComponent'));
    }

    return validationIssues;
  }
}
