import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';

export const CUSTOM_GRID_OPTIONS = {
  recordDefinitionName: 'com.example.test210500:fruits',
  nonExistingColumn: 'nonExistingColumn',
  fields: {
    fruit: {
      fieldId: 536870913,
      label: 'Fruit',
      type: RX_RECORD_DEFINITION.resourceTypes.character,
    },
    displayId: {
      fieldId: RX_RECORD_DEFINITION.coreFieldIds.displayId,
      label: 'Display id',
      type: RX_RECORD_DEFINITION.resourceTypes.character,
    },
    guid: {
      fieldId: RX_RECORD_DEFINITION.coreFieldIds.id,
      label: 'Guid',
      type: RX_RECORD_DEFINITION.resourceTypes.character,
    }
  },
  defaultAnimal: 'Panda',
  animalMatching: {
    banana: 'Monkey',
    apple: 'Snake',
    watermelon: 'Raccoon'
  }
}
