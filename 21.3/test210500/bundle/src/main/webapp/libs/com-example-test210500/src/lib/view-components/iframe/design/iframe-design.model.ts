import {
  IViewComponentDesignSandbox, IViewComponentDesignValidationIssue,
  validateCssClassName,
  ViewDesignerComponentModel
} from '@helix/platform/view/designer';
import { IViewDesignerComponentModel, RX_VIEW_DEFINITION } from '@helix/platform/view/api';
import {
  ExpressionFormControlComponent,
  IExpressionFormControlOptions,
  ISelectFormControlOptions,
  ISwitcherFormControlOptions,
  ITagAutocompleteValue,
  ITagsFormControlOptions,
  SelectFormControlComponent,
  SwitchFormControlComponent,
  TagsFormControlComponent
} from '@helix/platform/shared/components';
import { Injector } from '@angular/core';
import { Tooltip } from '@helix/platform/shared/api';
import { IIframeParameters } from './iframe.interface';
import { IFRAME_OPTIONS } from './iframe.types';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

const initialComponentProperties: IIframeParameters = {
  addAllowFromDomain: false,
  cssClasses: '',
  cssStyles: '',
  sandboxOptions: [],
  url: ''
};

// Default CSS classes supported in the Platform.
const supportedCssClasses = RX_VIEW_DEFINITION.styles.map(
  (style): ITagAutocompleteValue => ({text: style.name, data: {value: style.id}})
);

export class IframeDesignModel extends ViewDesignerComponentModel implements IViewDesignerComponentModel<IIframeParameters> {
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
          return this.validate(this.sandbox, componentProperties as IIframeParameters);
        })
      )
      .subscribe((validationIssues) => {
        this.sandbox.setValidationIssues(validationIssues);
      });
  }

  // Method called automatically that sets the view component input parameters
  // default values or current values.
  static getInitialProperties(initialProperties?: IIframeParameters): IIframeParameters {
    return {
      cssClasses: '',
      cssStyles: '',
      url: '',
      ...initialProperties,
      //  We have to cast the "addAllowFromDomain" value to Boolean as it is stored as a string in the properties
      // even if declared as boolean in the registration module.
      // The SwitchFormControlComponent require a boolean value.
      addAllowFromDomain: initialProperties && String(initialProperties.addAllowFromDomain) === 'true',
      //  We have to cast the "sandboxOptions" value to array of strings as it is stored as a string in the properties
      // even if declared as array of strings in the registration module.
      // This is because we allow multiple values to be selected.
      sandboxOptions: initialProperties.sandboxOptions ? JSON.parse(String(initialProperties.sandboxOptions)) : []
    }
  }

  private setInspectorConfig(model) {
    return {
      inspectorSectionConfigs: [
        {
          label: 'General',
          controls: [
            {
              name: 'url',
              component: ExpressionFormControlComponent,
              options: {
                label: 'iFrame source url',
                dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                operators: this.expressionConfigurator.getOperators(),
                isRequired: true
              } as IExpressionFormControlOptions
            },
            {
              name: 'sandboxOptions',
              component: SelectFormControlComponent,
              options: {
                label: 'Sanbox options',
                options: IFRAME_OPTIONS.sandboxOptions.map((sandboxOption: string) => {
                  return {
                    id: sandboxOption,
                    name: sandboxOption
                  }
                }),
                sortAlphabetically: false,
                // We allow multiple values to be selected.
                multiple: true,
                tooltip: new Tooltip(`Allows to specify the sanbox security options to be applied to the iFrame Html object.<br>
                <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/iframe" target="_blank">Reference.</a>`)
              } as ISelectFormControlOptions
            },
            {
              name: 'addAllowFromDomain',
              component: SwitchFormControlComponent,
              options: {
                label: 'Add Allow From Domain',
                tooltip: new Tooltip(`Allow from domain can be useful when embedding an Innovation Studio or Chatbot url in an iFrame.<br>
                It will generate a query parameter to add the current domain in the allow-from-domain query parameter, for example:<br>
                /com.bmc.dsm.chatbot/index.html?allow-from-domain=https://www.bmc.com`)
              } as ISwitcherFormControlOptions
            }
          ]
        },
        {
          label: 'Styling',
          controls: [
            {
              name: 'cssStyles',
              component: ExpressionFormControlComponent,
              options: {
                label: 'Apply CSS Styles (style tag)',
                tooltip: new Tooltip(`Enter Style properties to apply to this view component.<br>
                For example:<br>
                border: 1px solid red;background-color:red;`),
                dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                operators: this.expressionConfigurator.getOperators()
              } as IExpressionFormControlOptions
            },
            {
              name: 'cssClasses',
              component: TagsFormControlComponent,
              options: {
                label: 'Apply CSS classes (class tag)',
                placeholder: 'Add CSS classes',
                autocompleteValues: supportedCssClasses,
                tooltip: new Tooltip('Enter CSS class names to apply to this view component.'),
                errorCheck: validateCssClassName
              } as ITagsFormControlOptions
            }
          ]
        }
      ]
    };
  }

  // Design time validation. The "model" contains the input parameters (all steps).
  private validate(
    sandbox: IViewComponentDesignSandbox,
    model: IIframeParameters
  ): IViewComponentDesignValidationIssue[] {
    let validationIssues = [];

    // The model contains the input parameter values.
    if (!model.url) {
      validationIssues.push(sandbox.createError('The url is required.', 'url'));
    }

    return validationIssues;
  }
}
