import {
  getStandardPropsInspectorConfigs,
  IViewComponentDesignCommonDataDictionaryBranch,
  IViewComponentDesignSandbox,
  IViewComponentDesignValidationIssue,
  validateStandardProps,
  ViewDesignerComponentModel
} from '@helix/platform/view/designer';
import { IViewDesignerComponentModel, RX_STANDARD_PROPS_DEFAULT_VALUES } from '@helix/platform/view/api';
import { ExpressionFormControlComponent, IExpressionFormControlOptions, TextFormControlComponent } from '@helix/platform/shared/components';
import { Injector } from '@angular/core';
import { Tooltip } from '@helix/platform/shared/api';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { ILabelLazyLoadedProperties } from '../label-lazy-loaded.types';
import {
  IViewComponentDesignSettablePropertiesDataDictionary
} from '@helix/platform/view/designer/public-interfaces/view-component-design-settable-properties-data-dictionary.interfaces';

// View component input parameters.
const initialComponentProperties: ILabelLazyLoadedProperties = {
  name: '',
  message: ''
};

export class LabelLazyLoadedDesignModel extends ViewDesignerComponentModel implements IViewDesignerComponentModel {
  constructor(protected injector: Injector,
              protected sandbox: IViewComponentDesignSandbox<ILabelLazyLoadedProperties>) {
    super(injector, sandbox);

    // Setting view component input parameters configuration.
    sandbox.updateInspectorConfig(this.setInspectorConfig(initialComponentProperties));

    // Registering the view component validation based on the input parameter values.
    combineLatest([this.sandbox.componentProperties$])
      .pipe(
        map(([componentProperties]: [ILabelLazyLoadedProperties]) =>
          this.validate(this.sandbox, componentProperties)
        )
      )
      .subscribe((validationIssues) => {
        this.sandbox.setValidationIssues(validationIssues);
      });


    this.sandbox.getComponentPropertyValue('name').subscribe((name) => {
      const componentName = name ? `${this.sandbox.descriptor.name} (${name})` : this.sandbox.descriptor.name;

      // Add settable view component properties to the expression builder data dictionary.
      // These properties can be set via the Set property view action.
      this.sandbox.setSettablePropertiesDataDictionary(componentName, this.getSettablePropertiesDataDictionaryBranch());

      // Registering the output parameters.
      this.sandbox.setCommonDataDictionary(this.prepareDataDictionary(componentName));
    });
  }

  // Method called automatically that sets the view component input parameters
  // default values or current values.
  static getInitialProperties(initialProperties?: ILabelLazyLoadedProperties): ILabelLazyLoadedProperties {
    return {
      message: '',
      // initial values for the standard properties available for all view components
      ...RX_STANDARD_PROPS_DEFAULT_VALUES,
      // property values of an existing view component that are already saved in the view
      ...initialProperties
    }
  }

  private getSettablePropertiesDataDictionaryBranch(): IViewComponentDesignSettablePropertiesDataDictionary {
    return [
      {
        label: 'Hidden',
        expression: this.getExpressionForProperty('hidden')
      },
      {
        label: 'Message',
        expression: this.getExpressionForProperty('message')
      }
    ];
  }

  private prepareDataDictionary(componentName: string): IViewComponentDesignCommonDataDictionaryBranch {
    return null;
  }

  private setInspectorConfig(model: ILabelLazyLoadedProperties) {
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
            },
            // Add standard properties available for most view components, such as
            // Hidden, Available on devices, CSS classes.
            ...getStandardPropsInspectorConfigs()
          ]
        }
      ]
    };
  }

  private validate(
    sandbox: IViewComponentDesignSandbox<ILabelLazyLoadedProperties>,
    model: ILabelLazyLoadedProperties
  ): IViewComponentDesignValidationIssue[] {
    const validationIssues: IViewComponentDesignValidationIssue[] = [];

    if (!model.message) {
      validationIssues.push(sandbox.createError('Message cannot be blank.', 'message'));
    }

    // Validate standard properties.
    validationIssues.push(...validateStandardProps(model));

    return validationIssues;
  }
}
