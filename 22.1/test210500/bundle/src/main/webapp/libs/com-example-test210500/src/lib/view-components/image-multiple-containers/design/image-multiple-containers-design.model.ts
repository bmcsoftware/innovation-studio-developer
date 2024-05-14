import {
  IViewComponentDesignCommonDataDictionaryBranch,
  IViewComponentDesignSandbox,
  IViewComponentDesignValidationIssue,
  validateCssClassName,
  validateCssClassNames,
  ViewDesignerComponentModel
} from '@helix/platform/view/designer';
import { IViewDesignerComponentModel } from '@helix/platform/view/api';
import {
  ITagsFormControlOptions,
  OptionalExpressionControlComponent,
  TagsFormControlComponent,
  TextFormControlComponent
} from '@helix/platform/shared/components';
import { Injector } from '@angular/core';
import { Tooltip } from '@helix/platform/shared/api';
import { IViewComponentDesignSettablePropertiesDataDictionary } from '@helix/platform/view/designer/public-interfaces/view-component-design-settable-properties-data-dictionary.interfaces';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { IImageMultipleContainersParameters } from './image-multiple-containers.interface';

// View component input parameters.
const initialComponentProperties: IImageMultipleContainersParameters = {
  styles: '',
  hidden: ''
};

export class ImageMultipleContainersDesignModel extends ViewDesignerComponentModel implements IViewDesignerComponentModel {
  constructor(protected injector: Injector,
              protected sandbox: IViewComponentDesignSandbox) {
    super(injector, sandbox);

    // Setting view component input parameters configuration.
    sandbox.updateInspectorConfig(this.setInspectorConfig(initialComponentProperties));

    // Registering the view component validation based on the input parameter values.
    combineLatest([this.sandbox.componentProperties$])
      .pipe(
        map(([componentProperties]: [IImageMultipleContainersParameters]) =>
          this.validate(this.sandbox, componentProperties)
        )
      )
      .subscribe((validationIssues) => {
        this.sandbox.setValidationIssues(validationIssues);
      });


    this.sandbox.getComponentPropertyValue('name').subscribe((name) => {
      const componentName = name ? `${this.sandbox.descriptor.name} (${name})` : this.sandbox.descriptor.name;

      // Registering the properties accessible by button action "set property".
      this.sandbox.setSettablePropertiesDataDictionary(componentName, this.getSettablePropertiesDataDictionaryBranch());
      // Registering the output parameters.
      this.sandbox.setCommonDataDictionary(this.prepareDataDictionary(componentName));
    });
  }

  // Method called automatically that sets the view component input parameters
  // default values or current values.
  static getInitialProperties(initialProperties?: IImageMultipleContainersParameters): IImageMultipleContainersParameters {
    // The hidden property are string with as values:
    // '0' for false,
    // '1' for true,
    // At runtime the accepted values will be number type (0 or 1).
    return {
      hidden: '0',
      ...initialProperties
    }
  }

  private getSettablePropertiesDataDictionaryBranch(): IViewComponentDesignSettablePropertiesDataDictionary {
    return [
      {
        label: 'Hidden',
        expression: this.getExpressionForProperty('hidden'),
      }
    ];
  }

  private prepareDataDictionary(componentName: string): IViewComponentDesignCommonDataDictionaryBranch {
    return null;
  }

  private setInspectorConfig(model : IImageMultipleContainersParameters) {
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
              name: 'styles',
              component: TagsFormControlComponent,
              options: {
                label: 'CSS classes',
                placeholder: 'Add CSS classes',
                tooltip: new Tooltip('Enter CSS class names to apply to this view component.'),
                errorCheck: validateCssClassName
              } as ITagsFormControlOptions
            },
            {
              name: 'hidden',
              component: OptionalExpressionControlComponent,
              options: {
                label: 'Hidden',
                dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                operators: this.expressionConfigurator.getOperators(),
              }
            }
          ]
        }
      ]
    };
  }

  private validate(
    sandbox: IViewComponentDesignSandbox,
    model: IImageMultipleContainersParameters
  ): IViewComponentDesignValidationIssue[] {
    let validationIssues = [];

    validationIssues = validationIssues.concat(validateCssClassNames(model.styles));

    return validationIssues;
  }
}
