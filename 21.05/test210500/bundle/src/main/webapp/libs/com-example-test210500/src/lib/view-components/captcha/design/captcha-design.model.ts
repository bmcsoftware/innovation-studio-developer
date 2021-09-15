import {
  IViewComponentDesignCommonDataDictionaryBranch,
  IViewComponentDesignSandbox,
  IViewComponentDesignValidationIssue,
  ViewDesignerComponentModel
} from '@helix/platform/view/designer';
import { IViewDesignerComponentModel } from '@helix/platform/view/api';
import {
  ExpressionFormControlComponent,
  IExpressionFormControlOptions
} from '@helix/platform/shared/components';
import { Injector } from '@angular/core';
import { ICaptchaParameters } from './captcha.interface';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

const initialComponentProperties: ICaptchaParameters = {
  apiKey: ''
};

export class CaptchaDesignModel extends ViewDesignerComponentModel implements IViewDesignerComponentModel<ICaptchaParameters> {
  constructor(protected injector: Injector,
              protected sandbox: IViewComponentDesignSandbox) {
    super(injector, sandbox);

    // Setting view component input parameters configuration.
    sandbox.updateInspectorConfig(this.setInspectorConfig(initialComponentProperties));

    // Registering the output parameters.
    this.sandbox.setCommonDataDictionary(this.prepareDataDictionary(this.sandbox.descriptor.name));

    // Registering the custom validation.
    combineLatest([this.sandbox.componentProperties$])
      .pipe(
        map(([componentProperties]) => {
          return this.validate(this.sandbox, componentProperties);
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
              name: 'apiKey',
              component: ExpressionFormControlComponent,
              options: {
                label: 'hCaptcha Api Key',
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

  // Design time validation.
  private validate(
    sandbox: IViewComponentDesignSandbox,
    model: any
  ): IViewComponentDesignValidationIssue[] {
    let validationIssues = [];

    // The model contains the input parameter values.
    if (!model.apiKey) {
      validationIssues.push(sandbox.createError('The Api Key is required.', 'apiKey'));
    }

    return validationIssues;
  }

  // We will output the token to verify it later by the backend if we want to.
  private prepareDataDictionary(componentName: string): IViewComponentDesignCommonDataDictionaryBranch {
    return {
      label: componentName,
      expression: this.getExpressionForProperty('api'),
      children: [
        {
          label: 'Response token',
          expression: this.getExpressionForProperty('hCaptchaResponseToken')
        }
      ]
    }
  }
}
