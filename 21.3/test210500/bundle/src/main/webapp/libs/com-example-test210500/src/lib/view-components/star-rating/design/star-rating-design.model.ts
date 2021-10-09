import {
  IViewComponentDesignCommonDataDictionaryBranch,
  IViewComponentDesignSandbox,
  IViewComponentDesignValidationIssue,
  validateCssClassName,
  validateCssClassNames,
  ViewDesignerComponentModel
} from '@helix/platform/view/designer';
import {
  BooleanFormControlComponent,
  ColorPickerFormControlComponent,
  ExpressionFormControlComponent,
  ICheckboxFormControlOptions,
  IExpressionFormControlOptions,
  ISelectFormControlOptions,
  ITagAutocompleteValue,
  ITagsFormControlOptions,
  OptionalExpressionControlComponent,
  SelectFormControlComponent,
  TagsFormControlComponent,
  TextFormControlComponent
} from '@helix/platform/shared/components';
import { map } from 'rxjs/operators';
import { Injector } from '@angular/core';
import { IStarRatingParameters } from './star-rating.interface';
import { Tooltip } from '@helix/platform/shared/api';
import { combineLatest } from 'rxjs';
import { values } from 'lodash';
import { IViewComponentDesignSettablePropertiesDataDictionary } from '@helix/platform/view/designer/public-interfaces/view-component-design-settable-properties-data-dictionary.interfaces';
import { STAR_RATING_SIZE_OPTIONS } from '../star-rating.types';
import { IViewDesignerComponentModel, RX_VIEW_DEFINITION } from '@helix/platform/view/api';

// Default CSS classes supported in the Platform.
const supportedCssClasses = RX_VIEW_DEFINITION.styles.map(
  (style): ITagAutocompleteValue => ({text: style.name, data: {value: style.id}})
);

// Definition of the view component for the inspector.
const propertiesForInspector: IStarRatingParameters = {
  // Name is a general property and does not need to be declared in the view component registration module.
  name: '',
  defaultNumberOfStars: 0,
  numberOfStars: 0,
  numberOfStarsSelected: 0,
  hidden: false,
  disabled: false,
  label: '',
  size: '',
  cssStyles: null,
  labelColor: '',
  isRequired: false
};

export class StarRatingDesignModel extends ViewDesignerComponentModel implements IViewDesignerComponentModel<IStarRatingParameters> {
  // LMA:: TODO:: See how to pass the values back to the design time component, is that the good way?
  // Or should we subscribe to the sandbox object somehow from the model, is there a way?
  modelSandbox: IViewComponentDesignSandbox;

  constructor(protected injector: Injector,
              protected sandbox: IViewComponentDesignSandbox) {
    super(injector, sandbox);

    // Used for the design time component to subscribe to this.sandbox.componentProperties$.
    this.modelSandbox = sandbox;

    // Here we define the properties passed to the Inspector.
    // Those are not the default values.
    sandbox.updateInspectorConfig(this.setInspectorConfig(propertiesForInspector));

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

    // We set the data dictionary and the properties that can be set using a button action "set property".
    this.sandbox.getComponentPropertyValue('name').subscribe((name) => {
      // This is used when we want here to give a specific name to the view component.
      // This way if we have multiple view components in the view we can make them specific
      // and find them easily in the data dictionaries.
      const componentName = name ? `${this.sandbox.descriptor.name} (${name})` : this.sandbox.descriptor.name;

      // Setting the properties that can be set through a button action "Set Property".
      this.sandbox.setSettablePropertiesDataDictionary(componentName, this.prepareSetProperties());

      // Adding the data dictionary used to declare output parameters. A difference with AngularJs were it could be
      // automatic.
      // Note: The refresh action will not appear if the view component does not have at least one output parameter.
      this.sandbox.setCommonDataDictionary(this.prepareDataDictionary(componentName));

      // Setting the breadcrumb with the view component type and optional name.
      // This call is optional.
      this.sandbox.setBreadcrumbs(componentName);
    });
  }

  // This method will be automatically called when setting up the default values.
  // initialProperties contain the values already saved in the View Component Properties
  // In View Designer.
  static getInitialProperties(initialProperties?: IStarRatingParameters): IStarRatingParameters {
    console.log(initialProperties);

    return {
      // Name is a general property and does not need to be declared in the view component registration module.
      name: '',
      defaultNumberOfStars: 2.5,
      numberOfStars: 0,
      numberOfStarsSelected: 0,
      // "0" is false, "1" is true.
      hidden: "0",
      disabled: "0",
      label: '',
      size: '',
      cssStyles: null,
      labelColor: '#000000',
      // isRequired: false,
      ...initialProperties,
      //  We have to cast the "isRequired" value to Boolean as it is stored as a string in the properties
      // even if declared as boolean in the registration module.
      // The BooleanFormControlComponent requires a boolean value.
      isRequired: initialProperties && String(initialProperties.isRequired) === 'true'
    }
  }

  // Preparing the settable properties, aka the properties that can be set
  // through a button action "set property".
  private prepareSetProperties(): IViewComponentDesignSettablePropertiesDataDictionary {
    return [
      {
        label: 'Hidden',
        expression: this.getExpressionForProperty('hidden'),
      },
      {
        label: 'Disabled',
        expression: this.getExpressionForProperty('disabled'),
      },
      {
        label: 'numberOfStars',
        expression: this.getExpressionForProperty('numberOfStars'),
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
          label: 'Number Of Stars Selected',
          expression: this.getExpressionForProperty('numberOfStarsSelected')
        }
      ]
    }
  }

  // Defines how the different input parameters are displayed in the View Component details
  // in View Designer.
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
                tooltip: new Tooltip('Enter a name to uniquely identify the Star Rating Component')
              }
            },
            {
              name: 'label',
              component: TextFormControlComponent,
              options: {
                label: 'Label',
                required: true
              }
            },
            {
              name: 'defaultNumberOfStars',
              component: TextFormControlComponent,
              options: {
                label: 'Default Number of Stars',
                tooltip: new Tooltip('Default number of stars, between 0 and 5.'),
                // LMA:: Intellisense proposes "isRequired" but the correct key is actually "required".
                required: true
              }
            },
            {
              name: 'numberOfStars',
              component: ExpressionFormControlComponent,
              options: {
                label: 'Number Of Stars',
                tooltip: new Tooltip('Number of stars to display.'),
                isRequired: true,
                dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                operators: this.expressionConfigurator.getOperators()
              } as IExpressionFormControlOptions
            },
            {
              name: 'isRequired',
              component: BooleanFormControlComponent,
              options: {
                description: 'Shows a required label for this component.'
              } as ICheckboxFormControlOptions
            }
          ]
        },
        {
          label: 'Styling',
          controls: [
            {
              name: 'size',
              component: SelectFormControlComponent,
              options: {
                label: 'Size',
                // the list of options must be an array of id and name, such as:
                // [{id:'', name:''},...]
                // Both id and name must be Strings (ISelectOption[]).
                options: values(STAR_RATING_SIZE_OPTIONS.sizeOptions),
                sortAlphabetically: false
              } as ISelectFormControlOptions
            },
            {
              name: 'labelColor',
              component: ColorPickerFormControlComponent,
              options: {
                label: 'Label Color'
              }
            },
            {
              name: 'cssStyles',
              component: TagsFormControlComponent,
              options: {
                label: 'CSS classes',
                placeholder: 'Add CSS classes',
                autocompleteValues: supportedCssClasses,
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
                operators: this.expressionConfigurator.getOperators()
              }
            },
            {
              name: 'disabled',
              component: OptionalExpressionControlComponent,
              options: {
                label: 'Disabled',
                dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                operators: this.expressionConfigurator.getOperators()
              }
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
    if (model.defaultNumberOfStars < 0 ||  model.defaultNumberOfStars > 5 ) {
      validationIssues.push(sandbox.createError('The default number of stars must be a number between 0 and 5.', 'defaultNumberOfStars'));
    }

    if (!model.label) {
      validationIssues.push(sandbox.createError('The label cannot be empty.', 'label'));
    }

    // We are leveraging the Platform Css class validator.
    validationIssues = validationIssues.concat(validateCssClassNames(model.cssStyles));

    return validationIssues;
  }
}
