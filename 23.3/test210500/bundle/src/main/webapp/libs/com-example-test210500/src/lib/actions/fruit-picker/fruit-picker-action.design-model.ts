import { RxViewDesignerActionModel } from '@helix/platform/view/designer';
import {
  IViewActionDesignPropertyEditorConfig,
  IViewActionDesignSandbox, IViewActionOutputDataDictionary,
  ViewActionDesignEditableProperties
} from '@helix/platform/view/api';
import { IFruitAttributeDetail, IFruitPickerActionDesignProperties } from './fruit-picker-action.interface';
import { Injector } from '@angular/core';
import {
  ExpressionFormControlComponent,
  IExpressionFormControlOptions, ISelectFormControlOptions, ISelectOption,
  SelectFormControlComponent
} from '@helix/platform/shared/components';
import { IDataPageParams, IDataPageResult, IFormControlBuilderConfig, Tooltip } from '@helix/platform/shared/api';
import { distinctUntilChanged, pluck, skip } from 'rxjs/operators';
import { findIndex, map, sortBy } from 'lodash';
import {
  FRUIT_PICKER_ACTION, FRUIT_PICKER_DEFAULT_FRUITS,
  FRUIT_PICKER_FRUIT_LIST_ACTION
} from './fruit-picker-action.types';
import { RxRecordInstanceDataPageService } from '@helix/platform/record/api';
import { KeyValueObject } from '@bmc-ux/adapt-angular';
import { GradientComponent } from '../../inspectors/gradient/gradient.component';
import { GRADIENT_COMPONENT_OPTIONS } from '../../inspectors/gradient/gradient.types';
import { IGradientOptions } from '../../inspectors/gradient/gradient.interface';

export class FruitPickerActionDesignModel extends RxViewDesignerActionModel {
  // We need to declare the services outside the constructor to avoid compilation errors,
  // we need to use the injector.
  private rxRecordInstanceDataPageService = this.injector.get<RxRecordInstanceDataPageService>(RxRecordInstanceDataPageService);

  // Default properties.
  defaultProps: ViewActionDesignEditableProperties<IFruitPickerActionDesignProperties> = {
    fruit: 'banana'
  };

  // This method will be called automatically and will set the default values
  // of the input parameters or their current values.
  static getInitialProperties(initialProperties: ViewActionDesignEditableProperties<IFruitPickerActionDesignProperties>) {
    return {
      fruit: 'banana',
      // The dynamic attributes are stored as new input parameters on the format:
      // 'fruitAttributes.<dynamicParameterName>', for example:
      // 'fruitAttributes.color'
      // We could set their default values as well using strings, such as:
      'fruitAttributes.color': `${GRADIENT_COMPONENT_OPTIONS.defaultValues.left}|${GRADIENT_COMPONENT_OPTIONS.defaultValues.right}`,
      // Current values.
      ...initialProperties
    };
  }

  // The constructor is setting the action properties (input parameters)
  // and the list of the output parameters (data dictionary).
  constructor(protected injector: Injector,
              readonly sandbox: IViewActionDesignSandbox<IFruitPickerActionDesignProperties>) {
    super(injector, sandbox);

    // The fruit list is stored in a record definition, so we fetch the record instances to build the list.
    // The default value will be applied later via the getInitialProperties() with:
    // fruit: 'banana'
    const params: IDataPageParams = {
      // Record Definition to fetch data into.
      recorddefinition: FRUIT_PICKER_ACTION.recordDefinitionName,
      // List of field Ids we want to fetch. This is an array of field Ids.
      propertySelection: [FRUIT_PICKER_ACTION.fruitFieldId],
      // Page size (-1 = all).
      pageSize: -1,
      // Start Index (if we want to handle the pagination), 0 means we want to get
      // from the first record instance.
      startIndex: 0,
      // Query criteria. We want to get all fruits.
      queryExpression: FRUIT_PICKER_ACTION.queryExpression
    };

    this.rxRecordInstanceDataPageService.get({params}).subscribe((results: IDataPageResult) => {
      // If there are no data in the record definition we use a default list for the example (FRUIT_PICKER_DEFAULT_FRUITS).
      // We need to build the list of available fruits.
      let fruitList: ISelectOption[] = map(results.data, (fruitRecordInstance: KeyValueObject) => {
        const fruit = fruitRecordInstance[FRUIT_PICKER_ACTION.fruitFieldId];

        // the list of options must be an array of id and name, such as:
        // [{id:'', name:''},...]
        // Both id and name must be Strings (ISelectOption[]).
        return {
          id: fruit,
          name: fruit
        };
      }) || FRUIT_PICKER_DEFAULT_FRUITS;

      // We sort the list of fruits by their names.
      fruitList = sortBy(fruitList, ['name']);

      // We have the fruit list so we can continue the configuration.
      // The fruit properties (color, etc...) depend on the fruit so we subscribe to the fruit value.
      const selectedFruit$ = this.sandbox.actionProperties$.pipe(
        pluck('fruit'),
        distinctUntilChanged()
      );

      // Resetting the default values when the fruit selection has changed.
      selectedFruit$.pipe(
        skip(1)
      ).subscribe((fruit: string) => {
        this.sandbox.setActionProperties({
          fruit
        });
      });

      // Recreating the fruit attribute list once the fruit is selected.
      selectedFruit$.subscribe((fruit: string) => {
        // Depending on the selected fruit we will need to build the relevant parameter list
        // so we subscribe to the fruit selection.

        // Setting the input parameters properties.
        this.sandbox.setActionPropertyEditorConfig(this.getActionEditorConfig(fruitList, fruit));
      });
    });

    // Creating the data dictionary that contains the output parameter.
    this.sandbox.setActionOutputDataDictionary(this.getActionOutputDataDictionary());
  }

  // Defining the input parameters properties.
  // The fruit name is common to all fruits but the property list (color etc...) depend
  // on the fruit and are defined in FRUIT_PICKER_FRUIT_LIST_ACTION.
  private getActionEditorConfig(fruitList: ISelectOption[], fruit: string): IViewActionDesignPropertyEditorConfig {
    // Getting the fruit attribute list for the selected fruit.
    // If we do not have the configuration for this specific fruit we will use a "default" one.
    let index = findIndex(FRUIT_PICKER_FRUIT_LIST_ACTION, {name: fruit});

    if (index === -1) {
      index = findIndex(FRUIT_PICKER_FRUIT_LIST_ACTION, {name: 'default'});
    }

    const fruitAttributeList = FRUIT_PICKER_FRUIT_LIST_ACTION[index].necessaryAttributes;

    return [
      {
        name: 'fruit',
        component: SelectFormControlComponent,
        options: {
          label: 'Fruit',
          required: true,
          options: fruitList,
          tooltip: new Tooltip('Please select a fruit in the list. The list of fruits is in the record definition com.example.test210500:fruits.'),
          sortAlphabetically: false
        } as ISelectFormControlOptions
      },
      // Building the necessary attributes depending on the fruit.
      ...(fruit ? map(fruitAttributeList, (parameter: IFruitAttributeDetail) => {
            // The dynamic attributes are stored as new input parameters on the format:
            // 'fruitAttributes.<dynamicParameterName>', for example:
            // 'fruitAttributes.color'
            const attributeConfiguration: IFormControlBuilderConfig = {
              name: `fruitAttributes.${parameter.name}`,
              // We are using a custom component to select a gradient of color.
              // This shows how to create custom selectors.
              component: parameter.name === 'color' ? GradientComponent : ExpressionFormControlComponent
            };

            // The attribute option will depend on the attribute type.
            if (parameter.name !== 'color') {
              // For ExpressionFormControlComponent.
              attributeConfiguration.options =  {
                isRequired: parameter.isRequired,
                dataDictionary$: this.expressionConfigurator.getDataDictionary(),
                operators: this.expressionConfigurator.getOperators()
              } as IExpressionFormControlOptions;
            } else {
              // For GradientComponent.
              attributeConfiguration.options = {
                required: parameter.isRequired
              } as IGradientOptions;
            }

            // Adding some properties as needed list Tooltip or label.
            attributeConfiguration.options.label = parameter.label || parameter.name;

            if (parameter.tooltip) {
              attributeConfiguration.options.tooltip = new Tooltip(parameter.tooltip);
            }

            return attributeConfiguration;
          })
          // If the fruit is not defined we do not display any parameters.
          : []
      )
    ];
  }

  // Creating the Data Dictionary to define the output parameters ("fruitObject" here).
  // fruitObject has two children, fruit and configuration.
  // The property path come from the custom Rest api response:
  // src/main/java/com/example/bundle/FruitRest.java
  // Which returns an object FruitResponse src/main/java/com/example/bundle/FruitResponse.java (simplified version):
  // private String fruit;
  // private String configuration;
  private getActionOutputDataDictionary(): IViewActionOutputDataDictionary {
    return [
      {
        label: 'fruitObject',
        expression: this.getOutputExpressionForPropertyPath('fruitObject'),
        children: [
          {
            label: 'fruit',
            expression: this.getOutputExpressionForPropertyPath('fruitObject.fruit'),
          },
          {
            label: 'configuration',
            expression: this.getOutputExpressionForPropertyPath('fruitObject.configuration'),
          }
        ]
      }
    ];
  }
}
