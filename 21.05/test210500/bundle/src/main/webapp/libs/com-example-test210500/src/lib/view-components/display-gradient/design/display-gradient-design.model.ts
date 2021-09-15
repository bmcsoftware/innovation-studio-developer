import {
  IViewComponentDesignSandbox,
  IViewComponentDesignValidationIssue,
  ViewDesignerComponentModel
} from '@helix/platform/view/designer';
import { IViewDesignerComponentModel } from '@helix/platform/view/api';
import { Injector } from '@angular/core';
import { IDisplayGradientParameters } from './display-gradient.interface';
import { GRADIENT_COMPONENT_OPTIONS} from '../../../inspectors/gradient/gradient.types';
import { GradientComponent } from '../../../inspectors/gradient/gradient.component';
import { IGradientOptions } from '../../../inspectors/gradient/gradient.interface';
import { Tooltip } from '@helix/platform/shared/api';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

const initialComponentProperties: IDisplayGradientParameters = {
  gradient: `${GRADIENT_COMPONENT_OPTIONS.defaultValues.left}|${GRADIENT_COMPONENT_OPTIONS.defaultValues.right}`
};

export class DisplayGradientDesignModel extends ViewDesignerComponentModel implements IViewDesignerComponentModel<IDisplayGradientParameters> {
  // LMA:: TODO:: See how to pass the values back to the design time component, is that the good way?
  // Or should we subscribe to the sandbox object somehow from the model, is there a way?
  modelSandbox: IViewComponentDesignSandbox;

  constructor(protected injector: Injector,
              protected sandbox: IViewComponentDesignSandbox) {
    super(injector, sandbox);

    // Used for the design time component to subscribe to this.sandbox.componentProperties$.
    this.modelSandbox = sandbox;

    // Here we define the properties passed to the Inspector to define the input parameter.
    // Those are not the default values.
    sandbox.updateInspectorConfig(this.setInspectorConfig(initialComponentProperties));

    // Registering the custom validation.
    combineLatest([this.sandbox.componentProperties$])
      .pipe(
        map(([componentProperties]) => {
          return this.validate(this.sandbox, componentProperties as IDisplayGradientParameters);
        })
      )
      .subscribe((validationIssues) => {
        this.sandbox.setValidationIssues(validationIssues);
      });
  }

  // Method called automatically that sets the view component input parameters
  // default values or current values.
  static getInitialProperties(initialProperties?: IDisplayGradientParameters): IDisplayGradientParameters {
    return {
      // Setting the gradient default value.
      // The gradient will contain information of the starting color (left) to destination color (right).
      // It will be stored as, for example:
      // '#000000|#FFFFFF'
      // Please check the action "fruit-picker" for more details.
      gradient: `${GRADIENT_COMPONENT_OPTIONS.defaultValues.left}|${GRADIENT_COMPONENT_OPTIONS.defaultValues.right}`,
      ...initialProperties
    }
  }

  // Setting inspector for the input parameters.
  private setInspectorConfig(model) {
    return {
      inspectorSectionConfigs: [
        {
          label: 'General',
          controls: [
            // In this example the gradient is using a custom inspector previously created for the
            // action fruit-picker.
            {
              name: 'gradient',
              component: GradientComponent,
              options: {
                label: 'Gradient information',
                required: true,
                tooltip: new Tooltip('Please select the colors that will be used to create a gradient at runtime.')
              } as IGradientOptions
            }
          ]
        }
      ]
    };
  }

  // Design time validation. The "model" contains the input parameters (all steps).
  private validate(
    sandbox: IViewComponentDesignSandbox,
    model: IDisplayGradientParameters
  ): IViewComponentDesignValidationIssue[] {
    let validationIssues = [];

    // The model contains the input parameter values.
    if (!model.gradient) {
      validationIssues.push(sandbox.createError('The gradient is required.', 'gradient'));
    }

    return validationIssues;
  }
}
