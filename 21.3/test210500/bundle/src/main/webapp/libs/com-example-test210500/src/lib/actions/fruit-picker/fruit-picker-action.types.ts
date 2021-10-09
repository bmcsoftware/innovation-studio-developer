// We define the list of fruits and their specific attributes.
import { IFruitDefinition } from './fruit-picker-action.interface';
import { ISelectOption } from '@helix/platform/shared/components';

export const FRUIT_PICKER_FRUIT_LIST_ACTION: IFruitDefinition[] = [
  {
    name: 'banana',
    necessaryAttributes: [
      {
        name: 'color',
        label: 'Pick the desired color',
        tooltip: 'The color is very important, do you wish greenish or yellow?',
        type: 'colorPicker',
        isRequired: true
      },
      {
        name: 'isGrowingOnTrees',
        label: 'Is it growing on trees?',
        type: 'expression',
        isRequired: true
      },
      {
        name: 'length',
        tooltip: 'Minimum length to be picked up',
        type: 'expression',
        isRequired: true
      },
      {
        name: 'needsToBeCooked',
        type: 'expression',
        isRequired: true
      }
    ]
  },
  {
    name: 'watermelon',
    necessaryAttributes: [
      {
        name: 'color',
        label: 'Pick the gradient colors',
        tooltip: 'The color is very important, do you wish green or yellow?',
        type: 'gradient',
        isRequired: true
      },
      {
        name: 'isGrowingOnTrees',
        label: 'Is it growing on trees?',
        type: 'expression',
        isRequired: true
      },
      {
        name: 'width',
        tooltip: 'Minimum width to be picked up',
        type: 'expression',
        isRequired: true
      },
      {
        name: 'vendor',
        tooltip: 'What is the provider of this magnificent fruit?',
        type: 'expression',
        isRequired: true
      },
      {
        name: 'isForDessertOnly',
        type: 'expression',
        isRequired: true
      }
    ]
  },
  {
    name: 'default',
    // Attributes should match the ones defined in the Interface IFruitAttributes.
    necessaryAttributes: [
      {
        name: 'color',
        label: 'Pick the desired color',
        tooltip: 'The color is very important for this... unknown fruit?',
        type: 'colorPicker',
        isRequired: true
      },
      {
        name: 'isGrowingOnTrees',
        label: 'Is it growing on trees?',
        type: 'expression',
        isRequired: true
      }
    ]
  }
]

// Default fruits.
export const FRUIT_PICKER_DEFAULT_FRUITS: ISelectOption[] = [
  {
    id: 'banana',
    name: 'banana',
  },
  {
    id: 'watermelon',
    name: 'watermelon',
  }
];

export const FRUIT_PICKER_REST_ACTION = {
  url: '/api/com.example.test210500/fruit/generateconfiguration/'
}

export const FRUIT_PICKER_ACTION = {
  recordDefinitionName: 'com.example.test210500:fruits',
  fruitFieldId: 536870913,
  queryExpression: '1=1'
}
