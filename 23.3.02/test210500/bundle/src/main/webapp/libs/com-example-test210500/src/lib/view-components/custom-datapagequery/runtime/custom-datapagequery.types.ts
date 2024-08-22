import { RX_RECORD_DEFINITION } from '@helix/platform/record/api';

export const CUSTOM_DATAPAGEQUERY_OPTIONS = {
  datapageQueryName: 'com.example.bundle.Test210500FruitDataPageQuery',
  fields: {
    fruit: {
      fieldId: 'fruit',
      label: 'Fruit',
      type: RX_RECORD_DEFINITION.resourceTypes.character,
    },
    price: {
      fieldId: 'price',
      label: 'Price',
      type: RX_RECORD_DEFINITION.resourceTypes.character,
    },
    displayId: {
      fieldId: 'displayId',
      label: 'Display id',
      type: RX_RECORD_DEFINITION.resourceTypes.character,
    },
    guid: {
      fieldId: 'guid',
      label: 'Guid',
      type: RX_RECORD_DEFINITION.resourceTypes.character,
    }
  }
}
