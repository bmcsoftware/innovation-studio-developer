import {
  IViewComponentDesignCommonDataDictionaryBranch,
  IViewComponentDesignSandbox,
  IViewComponentDesignValidationIssue,
  ViewDesignerComponentModel
} from '@helix/platform/view/designer';
import { IViewDesignerComponentModel } from '@helix/platform/view/api';
import { Injector } from '@angular/core';
import { IWizardParameters } from './wizard-design.interface';
import { StepEditorComponent } from '../../../inspectors/step-editor/step-editor.component';
import { IStepEditorOptions } from '../../../inspectors/step-editor/step-editor.interface';
import { StepsMenuItem } from '@bmc-ux/adapt-angular';
import { combineLatest } from 'rxjs';
import { forEach } from 'lodash';
import { map } from 'rxjs/operators';
import { IViewComponentDesignSettablePropertiesDataDictionary } from '@helix/platform/view/designer/public-interfaces/view-component-design-settable-properties-data-dictionary.interfaces';
import { ExpressionFormControlComponent, IExpressionFormControlOptions } from '@helix/platform/shared/components';

const initialComponentProperties: IWizardParameters = {
  stepList: [],
  currentStep: 0
};

export class WizardDesignModel extends ViewDesignerComponentModel implements IViewDesignerComponentModel<IWizardParameters> {
  // This is very important as we use a "step editor" to let the user add / edit / remove steps.
  // When there are validation issues the user can click on the "correct" link.
  // Doing so will not only focus on the wizarad component property but also open the step editor
  // on the right action.
  // For this we need to provide the input parameters when defining the validation error object
  // here "stepList" and not one of its attribute like "label" or "icon" for example.
  private STEPS_KEY = 'stepList';

  // LMA:: TODO:: See how to pass the values back to the design time component, is that the good way?
  // Or should we subscribe to the sandbox object somehow from the model, is there a way?
  modelSandbox: IViewComponentDesignSandbox;

  constructor(protected injector: Injector,
              protected sandbox: IViewComponentDesignSandbox) {
    super(injector, sandbox);

    const componentName = this.sandbox.descriptor.name;

    // Used for the design time component to subscribe to this.sandbox.componentProperties$.
    this.modelSandbox = sandbox;

    // Here we define the properties passed to the Inspector.
    // Those are not the default values.
    sandbox.updateInspectorConfig(this.setInspectorConfig(initialComponentProperties));

    // Setting the properties that can be set through a button action "Set Property".
    // Here we want to set the current step in the wizard.
    this.sandbox.setSettablePropertiesDataDictionary(componentName, this.prepareSetProperties());

    // Adding the data dictionary used to declare output parameters, here the current step.
    this.sandbox.setCommonDataDictionary(this.prepareDataDictionary(componentName));

    // Registering the custom validation.
    combineLatest([this.sandbox.componentProperties$])
      .pipe(
        map(([componentProperties]) => {
          return this.validate(this.sandbox, componentProperties as IWizardParameters);
        })
      )
      .subscribe((validationIssues) => {
        this.sandbox.setValidationIssues(validationIssues);
      });
  }

  // Preparing the settable properties, aka the properties that can be set
  // through a button action "set property".
  private prepareSetProperties(): IViewComponentDesignSettablePropertiesDataDictionary {
    return [
      {
        label: 'Current step (index)',
        expression: this.getExpressionForProperty('currentStep'),
      }
    ];
  }

  // Preparing the data dictionary (for the output parameters for example).
  private prepareDataDictionary(componentName: string): IViewComponentDesignCommonDataDictionaryBranch {
    return {
      label: componentName,
      expression: this.getExpressionForProperty('api'),
      children: [
        {
          label: 'Current step (index)',
          expression: this.getExpressionForProperty('currentSelectedStep')
        }
      ]
    }
  }

  // This method will be automatically called when setting up the default values.
  // initialProperties contain the values already saved in the View Component Properties
  // In View Designer.
  static getInitialProperties(initialProperties?: IWizardParameters): IWizardParameters {
    return {
      currentStep: 0,
      ...initialProperties,
      // The stepList is an array of StepsMenuItem but is stored as a string even if it is
      // defined as an object in the interface. so we need to parse it back to an object.
      stepList: initialProperties.stepList ? JSON.parse(String(initialProperties.stepList)) : []
    }
  }

  private setInspectorConfig(model) {
    return {
      inspectorSectionConfigs: [
        {
          label: 'General',
          controls: [
            {
              name: 'currentStep',
              component: ExpressionFormControlComponent,
              options: {
                label: 'current Step (Index)',
                dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                operators: this.expressionConfigurator.getOperators(),
              } as IExpressionFormControlOptions
            }
          ]
        },
        {
          label: 'Steps',
          controls: [
            {
              name: this.STEPS_KEY,
              component: StepEditorComponent,
              options: {
                label: 'Steps',
                isRequired: true
              } as IStepEditorOptions
            }
          ]
        }
      ]
    };
  }

  // Design time validation. The "model" contains the stepList (all steps).
  private validate(
    sandbox: IViewComponentDesignSandbox,
    model: IWizardParameters
  ): IViewComponentDesignValidationIssue[] {
    const validationIssues = [];

    // As explained earlier we want to tell the step editor (StepEditorComponent) that there is a validation issue on
    // one specific step so the step editor opens on the specific step.
    // For this the propertyName needs to match the input parameter name ("stepList" here)
    // and we need to provide in the "data" attribute an object with an "actionIndex" property containing
    // the step index.
    // When the user will click on the "Correct" link the platform will automatically call the StepEditorComponent "focus" method
    // passing the "data" attribute.
    forEach(model?.stepList, (step: StepsMenuItem, index: number) => {
      if (!step.label) {
        const error: IViewComponentDesignValidationIssue = {
          description: 'The label is required.',
          propertyName: this.STEPS_KEY,
          type: 'error',
          data: {
            actionIndex: index
          }
        };

        validationIssues.push(error);
      }
    });

    if (!model.stepList || model.stepList.length === 0) {
      validationIssues.push({
        description: 'The wizard component requires at least one step.',
        propertyName: this.STEPS_KEY,
        type: 'error'
      });
    }

    return validationIssues;
  }
}
