import {
  IViewComponentDesignCommonDataDictionaryBranch,
  IViewComponentDesignSandbox, IViewComponentDesignValidationIssue,
  ViewDesignerComponentModel
} from '@helix/platform/view/designer';
import { IViewDesignerComponentModel } from '@helix/platform/view/api';
import {
  ExpressionFormControlComponent,
  IExpressionFormControlOptions,
  TextFormControlComponent
} from '@helix/platform/shared/components';
import { Injector } from '@angular/core';
import { ICallProcessParameters } from './call-process.interface';
import { Tooltip } from '@helix/platform/shared/api';
import { IViewComponentDesignSettablePropertiesDataDictionary } from '@helix/platform/view/designer/public-interfaces/view-component-design-settable-properties-data-dictionary.interfaces';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

const initialComponentProperties: ICallProcessParameters = {
  username: ''
};

// This view component looks a lot like "generate-password".
// Please see this view component for the code comment.
export class CallProcessDesignModel extends ViewDesignerComponentModel implements IViewDesignerComponentModel<ICallProcessParameters> {
  constructor(protected injector: Injector,
              protected sandbox: IViewComponentDesignSandbox) {
    super(injector, sandbox);

    sandbox.updateInspectorConfig(this.setInspectorConfig(initialComponentProperties));

    this.sandbox.getComponentPropertyValue('name').subscribe((name) => {
      const componentName = name ? `${this.sandbox.descriptor.name} (${name})` : this.sandbox.descriptor.name;

      this.sandbox.setSettablePropertiesDataDictionary(componentName, this.prepareSetProperties());
      this.sandbox.setCommonDataDictionary(this.prepareDataDictionary(componentName));
      this.sandbox.setBreadcrumbs(componentName);
    });

    // Registering the custom validation.
    combineLatest([this.sandbox.componentProperties$])
      .pipe(
        map(([componentProperties]) => {
          return this.validate(this.sandbox, componentProperties as ICallProcessParameters);
        })
      )
      .subscribe((validationIssues) => {
        this.sandbox.setValidationIssues(validationIssues);
      });
  }

  private setInspectorConfig(model) {
    return {
      inspectorSectionConfigs: [
        {
          label: 'General',
          controls: [
            {
              name: 'name',
              component: TextFormControlComponent,
              options: {
                label: 'View Component Name',
                tooltip: new Tooltip('Enter a name to uniquely identify the Call Process Component.')
              }
            },
            {
              name: 'username',
              component: ExpressionFormControlComponent,
              options: {
                label: 'User Name',
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

  private prepareSetProperties(): IViewComponentDesignSettablePropertiesDataDictionary {
    return [
      {
        label: 'username',
        expression: this.getExpressionForProperty('username'),
      }
    ];
  }

  private prepareDataDictionary(componentName: string): IViewComponentDesignCommonDataDictionaryBranch {
    return {
      label: componentName,
      expression: this.getExpressionForProperty('api'),
      children: [
        {
          label: 'Password',
          expression: this.getExpressionForProperty('password')
        }
      ]
    }
  }

  // Design time validation. The "model" contains the input parameters (all steps).
  private validate(
    sandbox: IViewComponentDesignSandbox,
    model: ICallProcessParameters
  ): IViewComponentDesignValidationIssue[] {
    let validationIssues = [];

    // The model contains the input parameter values.
    if (!model.username) {
      validationIssues.push(sandbox.createError('The username is required.', 'username'));
    }

    return validationIssues;
  }
}
