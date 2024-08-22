import {
  IViewComponentDesignSandbox,
  IViewComponentDesignValidationIssue,
  ViewDesignerComponentModel
} from '@helix/platform/view/designer';
import { IViewDesignerComponentModel } from '@helix/platform/view/api';
import {
  ExpressionFormControlComponent,
  IExpressionFormControlOptions,
  ISwitcherFormControlOptions,
  SwitchFormControlComponent
} from '@helix/platform/shared/components';
import { Injector } from '@angular/core';
import { ICodeViewerParameters } from './code-viewer.interface';
import { Tooltip } from '@helix/platform/shared/api';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

const initialComponentProperties: ICodeViewerParameters = {
  code: '',
  language: '',
  prettifyJson: false
};

// This View component will display code (typescript, html etc...) as highlighting code leveraging Adapt code viewer component.
export class CodeViewerDesignModel extends ViewDesignerComponentModel implements IViewDesignerComponentModel<ICodeViewerParameters> {
  constructor(protected injector: Injector,
              protected sandbox: IViewComponentDesignSandbox) {
    super(injector, sandbox);

    // Here we define the properties passed to the Inspector.
    // Those are not the default values.
    sandbox.updateInspectorConfig(this.setInspectorConfig(initialComponentProperties));

    // Registering the custom validation.
    combineLatest([this.sandbox.componentProperties$])
      .pipe(
        map(([componentProperties]) => {
          return this.validate(this.sandbox, componentProperties as ICodeViewerParameters);
        })
      )
      .subscribe((validationIssues) => {
        this.sandbox.setValidationIssues(validationIssues);
      });
  }

  // Method called automatically that sets the view component input parameters
  // default values or current values.
  static getInitialProperties(initialProperties?: ICodeViewerParameters): ICodeViewerParameters {
    return {
      code: '',
      language: '',
      ...initialProperties,
      //  We have to cast the "prettifyJson" value to Boolean as it is stored as a string in the properties
      // even if declared as boolean in the registration module.
      // The SwitchFormControlComponent require a boolean value.
      prettifyJson: initialProperties && String(initialProperties.prettifyJson) === 'true'
    }
  }

  private setInspectorConfig(model) {
    return {
      inspectorSectionConfigs: [
        {
          label: 'General',
          controls: [
            {
              name: 'code',
              component: ExpressionFormControlComponent,
              options: {
                label: 'Code (string)',
                tooltip: new Tooltip('The code must be a string.'),
                dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                operators: this.expressionConfigurator.getOperators(),
                isRequired: true
              } as IExpressionFormControlOptions
            },
            {
              name: 'language',
              component: ExpressionFormControlComponent,
              options: {
                label: 'language',
                dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                operators: this.expressionConfigurator.getOperators(),
                isRequired: true
              } as IExpressionFormControlOptions
            },
            {
              name: 'prettifyJson',
              component: SwitchFormControlComponent,
              options: {
                label: 'Prettify Json',
                tooltip: new Tooltip(`Will prettify json. Sometimes the Json is displayed in a single line.<br> If this option is enabled the json will be prettified.`),
              } as ISwitcherFormControlOptions
            }
          ]
        }
      ]
    };
  }

  // Design time validation. The "model" contains the input parameters (all steps).
  private validate(
    sandbox: IViewComponentDesignSandbox,
    model: ICodeViewerParameters
  ): IViewComponentDesignValidationIssue[] {
    let validationIssues = [];

    // The model contains the input parameter values.
    if (!model.code) {
      validationIssues.push(sandbox.createError('The code is required.', 'code'));
    }

    if (!model.language) {
      validationIssues.push(sandbox.createError('The language is required.', 'language'));
    }

    return validationIssues;
  }
}
