import {
  IViewComponentDesignCommonDataDictionaryBranch,
  IViewComponentDesignSandbox,
  IViewComponentDesignValidationIssue,
  ViewDesignerComponentModel
} from '@helix/platform/view/designer';
import { IViewDesignerComponentModel } from '@helix/platform/view/api';
import {
  ExpressionFormControlComponent,
  IExpressionFormControlOptions,
  TextFormControlComponent
} from '@helix/platform/shared/components';
import { Injector } from '@angular/core';
import { Tooltip } from '@helix/platform/shared/api';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { IDelayRegistrationParameters } from './delay-registration.interface';

// View component input parameters.
const initialComponentProperties: IDelayRegistrationParameters = {
  message: ''
};

export class DelayRegistrationDesignModel extends ViewDesignerComponentModel implements IViewDesignerComponentModel {
  constructor(protected injector: Injector,
              protected sandbox: IViewComponentDesignSandbox) {
    super(injector, sandbox);

    // Setting view component input parameters configuration.
    sandbox.updateInspectorConfig(this.setInspectorConfig(initialComponentProperties));

    // Registering the view component validation based on the input parameter values.
    combineLatest([this.sandbox.componentProperties$])
      .pipe(
        map(([componentProperties]: [IDelayRegistrationParameters]) =>
          this.validate(this.sandbox, componentProperties)
        )
      )
      .subscribe((validationIssues) => {
        this.sandbox.setValidationIssues(validationIssues);
      });


    this.sandbox.getComponentPropertyValue('name').subscribe((name) => {
      const componentName = name ? `${this.sandbox.descriptor.name} (${name})` : this.sandbox.descriptor.name;

      // Registering the output parameters.
      this.sandbox.setCommonDataDictionary(this.prepareDataDictionary(componentName));
    });
  }

  // Method called automatically that sets the view component input parameters
  // default values or current values.
  static getInitialProperties(initialProperties?: IDelayRegistrationParameters): IDelayRegistrationParameters {
    return {
      message: '',
      ...initialProperties
    }
  }

  private prepareDataDictionary(componentName: string): IViewComponentDesignCommonDataDictionaryBranch {
    return null;
  }

  private setInspectorConfig(model : IDelayRegistrationParameters) {
    return {
      inspectorSectionConfigs: [
        {
          label: 'General',
          controls: [
            {
              name: 'name',
              component: TextFormControlComponent,
              options: {
                label: 'View component name',
                tooltip: new Tooltip('Enter a name to uniquely identify the view component.')
              }
            },
            {
              name: 'message',
              component: ExpressionFormControlComponent,
              options: {
                label: 'Message',
                tooltip: new Tooltip('The message input parameter is required and will be displayed at runtime.'),
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

  private validate(
    sandbox: IViewComponentDesignSandbox,
    model: IDelayRegistrationParameters
  ): IViewComponentDesignValidationIssue[] {
    let validationIssues = [];

    if (!model.message) {
      validationIssues.push(sandbox.createError('Message cannot be blank.', 'message'));
    }

    return validationIssues;
  }
}
