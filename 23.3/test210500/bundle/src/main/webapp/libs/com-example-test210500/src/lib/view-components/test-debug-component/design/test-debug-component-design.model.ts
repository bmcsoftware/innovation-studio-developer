import { IViewComponentDesignSandbox, ViewDesignerComponentModel } from '@helix/platform/view/designer';
import { IViewDesignerComponentModel } from '@helix/platform/view/api';
import {
  BooleanFormControlComponent,
  ColorPickerFormControlComponent,
  CounterFormControlComponent,
  ExpressionFormControlComponent,
  ICheckboxFormControlOptions,
  IColorPickerFormControlOptions,
  ICounterFormControlOptions,
  IDefinitionPickerComponentOptions,
  IExpressionFormControlOptions,
  ISelectFormControlOptions,
  ISwitcherFormControlOptions,
  ITagsFormControlOptions,
  ITextareaFormControlOptions,
  ITextFormControlOptions,
  RxDefinitionPickerComponent,
  RxDefinitionPickerType,
  SelectFormControlComponent,
  SwitchFormControlComponent,
  TagsFormControlComponent,
  TextareaFormControlComponent,
  TextFormControlComponent
} from '@helix/platform/shared/components';
import { Injector } from '@angular/core';
import { ITestDebugComponentParameters } from './test-debug-component.interface';
import { Tooltip } from '@helix/platform/shared/api';
import { LogParametersComponent } from '../../../inspectors/log-parameters/log-parameters.component';
import { ILogParametersOptions } from '../../../inspectors/log-parameters/log-parameters.interface';
import { Observable } from 'rxjs';
import { IGradientOptions } from '../../../inspectors/gradient/gradient.interface';
import { GradientComponent } from '../../../inspectors/gradient/gradient.component';
import { GRADIENT_COMPONENT_OPTIONS } from '../../../inspectors/gradient/gradient.types';
import { values } from 'lodash';
import { STAR_RATING_SIZE_OPTIONS } from '../../star-rating/star-rating.types';

// Definiting the properties (those are not the default values).
const initialComponentProperties: ITestDebugComponentParameters = {
  // Definitions
  viewName: '',
  associationName: '',
  chatbotName: '',
  namedListName: '',
  processName: '',
  recordName: '',
  // Values
  booleanValue: false,
  expressionValue: '',
  numberValue: '',
  textValue: '',
  colorPickerValue: '',
  selectValue: '',
  switchValue: false,
  tagsValue: '',
  textAreaValue: '',
  // Custom Component
  gradient: ''
};

// This View Component will just display the defined gradient and the different input parameters.
// We define here pretty much all available input parameter type and the custom one "Gradient".
export class TestDebugComponentDesignModel extends ViewDesignerComponentModel implements IViewDesignerComponentModel<ITestDebugComponentParameters> {
  // We are going to pass this observable to the Form Control Component "log-parameters"
  // that will subscribe to all input parameter values and display them.
  // This is just an example and can be used for debug purposes.
  private inputParameterAttributes$: Observable<any>;

  constructor(protected injector: Injector,
              protected sandbox: IViewComponentDesignSandbox) {
    super(injector, sandbox);

    // For an Action we would pass the actionProperties$ attribute.
    // this.inputParameterAttributes$ = this.sandbox.actionProperties$;
    this.inputParameterAttributes$ = this.sandbox.componentProperties$;

    // Here we define the properties passed to the Inspector.
    // Those are not the default values.
    sandbox.updateInspectorConfig(this.setInspectorConfig(initialComponentProperties));
  }

  // Method called automatically that sets the view component input parameters
  // default values or current values.
  static getInitialProperties(initialProperties?: ITestDebugComponentParameters): ITestDebugComponentParameters {
    return {
      // Definitions
      viewName: '',
      associationName: '',
      chatbotName: '',
      namedListName: '',
      processName: '',
      recordName: '',
      // Values
      expressionValue: '"Foo"',
      numberValue: '123',
      textValue: '"Bar"',
      colorPickerValue: '',
      selectValue: STAR_RATING_SIZE_OPTIONS.sizeOptions.normal.id,
      tagsValue: '',
      textAreaValue: '"FooBar"',
      // Custom Component
      gradient: `${GRADIENT_COMPONENT_OPTIONS.defaultValues.left}|${GRADIENT_COMPONENT_OPTIONS.defaultValues.right}`,
      ...initialProperties,
      //  We have to cast the "booleanValue" and "switchValue" values to Boolean as it is stored as a string in the properties
      // even if declared as boolean in the registration module.
      // The BooleanFormControlComponent and SwitchFormControlComponent require a boolean value.
      booleanValue: initialProperties && String(initialProperties.booleanValue) === 'true',
      switchValue: initialProperties && String(initialProperties.switchValue) === 'true',
    }
  }

  // This list of parameters is not exhaustive.
  private setInspectorConfig(model) {
    return {
      inspectorSectionConfigs: [
        {
          label: 'Object Definition',
          controls: [
            {
              name: 'viewName',
              component: RxDefinitionPickerComponent,
              options: {
                label: 'viewName',
                definitionType: RxDefinitionPickerType.View
              } as IDefinitionPickerComponentOptions
            },
            {
              name: 'associationName',
              component: RxDefinitionPickerComponent,
              options: {
                label: 'associationName',
                definitionType: RxDefinitionPickerType.Association
              } as IDefinitionPickerComponentOptions
            },
            {
              name: 'chatbotName',
              component: RxDefinitionPickerComponent,
              options: {
                label: 'chatbotName',
                definitionType: RxDefinitionPickerType.Chatbot
              } as IDefinitionPickerComponentOptions
            },
            {
              name: 'namedListName',
              component: RxDefinitionPickerComponent,
              options: {
                label: 'namedListName',
                definitionType: RxDefinitionPickerType.NamedList
              } as IDefinitionPickerComponentOptions
            },
            {
              name: 'processName',
              component: RxDefinitionPickerComponent,
              options: {
                label: 'processName',
                definitionType: RxDefinitionPickerType.Process
              } as IDefinitionPickerComponentOptions
            },
            {
              name: 'recordName',
              component: RxDefinitionPickerComponent,
              options: {
                label: 'recordName',
                definitionType: RxDefinitionPickerType.Record
              } as IDefinitionPickerComponentOptions
            }
          ]
        },
        {
          label: 'Values',
          controls: [
            {
              name: 'booleanValue',
              component: BooleanFormControlComponent,
              options: {
                label: 'booleanValue'
              } as ICheckboxFormControlOptions
            },
            {
              name: 'expressionValue',
              component: ExpressionFormControlComponent,
              options: {
                label: 'expressionValue',
                dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                operators: this.expressionConfigurator.getOperators(),
              } as IExpressionFormControlOptions
            },
            {
              name: 'numberValue',
              component: CounterFormControlComponent,
              options: {
                label: 'numberValue',
                dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                operators: this.expressionConfigurator.getOperators(),
              } as ICounterFormControlOptions
            },
            {
              name: 'textValue',
              component: TextFormControlComponent,
              options: {
                label: 'textValue'
              } as ITextFormControlOptions
            },
            {
              name: 'textAreaValue',
              component: TextareaFormControlComponent,
              options: {
                label: 'textAreaValue'
              } as ITextareaFormControlOptions
            },
            {
              name: 'switchValue',
              component: SwitchFormControlComponent,
              options: {
                label: 'switchValue'
              } as ISwitcherFormControlOptions
            },
            {
              name: 'selectValue',
              component: SelectFormControlComponent,
              options: {
                label: 'selectValue',
                options: values(STAR_RATING_SIZE_OPTIONS.sizeOptions),
                sortAlphabetically: false
              } as ISelectFormControlOptions
            },
            {
              name: 'colorPickerValue',
              component: ColorPickerFormControlComponent,
              options: {
                label: 'colorPickerValue'
              } as IColorPickerFormControlOptions
            },
            {
              name: 'tagsValue',
              component: TagsFormControlComponent,
              options: {
                label: 'tagsValue'
              } as ITagsFormControlOptions
            }
          ]
        },
        {
          label: 'Custom Component (Form Control)',
          controls: [
            {
              name: 'gradient',
              component: GradientComponent,
              options: {
                label: 'Gradient',
                isRequired: true
              } as IGradientOptions
            }
          ]
        },
        {
          label: 'Debug Panel',
          controls: [
            // This component does not allow you to set anything but will display all other
            // input parameters as you set them, this can be used for debugging purposes
            // during development.
            // Before production you could remove this property.
            {
              name: 'Debug',
              component: LogParametersComponent,
              options: {
                label: 'Debug information',
                tooltip: new Tooltip('Here you can see all the different input parameters.'),
                isRequired: true,
                inputParameterAttributes$: this.inputParameterAttributes$
              } as ILogParametersOptions
            }
          ]
        }
      ]
    };
  }
}
