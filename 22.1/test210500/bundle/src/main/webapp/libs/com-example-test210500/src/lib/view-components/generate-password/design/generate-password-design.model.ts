import {
  IViewComponentDesignCommonDataDictionaryBranch,
  IViewComponentDesignSandbox,
  IViewComponentDesignValidationIssue,
  ViewDesignerComponentModel
} from '@helix/platform/view/designer';
import { IViewDesignerComponentModel } from '@helix/platform/view/api';
import {
  ExpressionFormControlComponent,
  IExpressionFormControlOptions, TextFormControlComponent
} from '@helix/platform/shared/components';
import { Injector } from '@angular/core';
import { IGeneratePasswordParameters} from './generate-password.interface';
import { Tooltip} from '@helix/platform/shared/api';
import { IViewComponentDesignSettablePropertiesDataDictionary } from '@helix/platform/view/designer/public-interfaces/view-component-design-settable-properties-data-dictionary.interfaces';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

const initialComponentProperties: IGeneratePasswordParameters = {
  username: ''
};

export class GeneratePasswordDesignModel extends ViewDesignerComponentModel implements IViewDesignerComponentModel<IGeneratePasswordParameters> {
  constructor(protected injector: Injector,
              protected sandbox: IViewComponentDesignSandbox) {
    super(injector, sandbox);

    // Here we define the properties passed to the Inspector to define the input parameter.
    // Those are not the default values.
    sandbox.updateInspectorConfig(this.setInspectorConfig(initialComponentProperties));

    // Now we prepare the output parameter (password) and for this we need to set the data dictionary.
    // Note:
    // The refresh action will not appear if the view component does not have at least one output parameter.
    // We will use the refresh action to request a password.
    this.sandbox.getComponentPropertyValue('name').subscribe((name) => {
      // This is used when we want here to give a specific name to the view component.
      // This way if we have multiple view components in the view we can make them specific
      // and find them easily in the data dictionaries.
      const componentName = name ? `${this.sandbox.descriptor.name} (${name})` : this.sandbox.descriptor.name;

      // Setting the properties that can be set through a button action "Set Property".
      // In our use case we decide that we allow setting the "username" through this "set property"
      // as well.
      this.sandbox.setSettablePropertiesDataDictionary(componentName, this.prepareSetProperties());

      // Preparing the data dictionary.
      this.sandbox.setCommonDataDictionary(this.prepareDataDictionary(componentName));

      // Setting the breadcrumb with the view component type and optional name.
      // This call is optional.
      this.sandbox.setBreadcrumbs(componentName);
    });

    // Registering the custom validation.
    combineLatest([this.sandbox.componentProperties$])
      .pipe(
        map(([componentProperties]) => {
          return this.validate(this.sandbox, componentProperties as IGeneratePasswordParameters);
        })
      )
      .subscribe((validationIssues) => {
        this.sandbox.setValidationIssues(validationIssues);
      });
  }

  // Setting inspector for the input parameters.
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
                tooltip: new Tooltip('Enter a name to uniquely identify the Generate Password Component.')
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

  // Preparing the settable properties, aka the properties that can be set
  // through a button action "set property".
  // In our case we want only to expose the username.
  private prepareSetProperties(): IViewComponentDesignSettablePropertiesDataDictionary {
    return [
      {
        label: 'username',
        expression: this.getExpressionForProperty('username'),
      }
    ];
  }

  // Preparing the data dictionary (for the output parameters for example).
  // In our case we will export the password.
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
    model: IGeneratePasswordParameters
  ): IViewComponentDesignValidationIssue[] {
    let validationIssues = [];

    // The model contains the input parameter values.
    if (!model.username) {
      validationIssues.push(sandbox.createError('The username is required.', 'username'));
    }

    return validationIssues;
  }
}
