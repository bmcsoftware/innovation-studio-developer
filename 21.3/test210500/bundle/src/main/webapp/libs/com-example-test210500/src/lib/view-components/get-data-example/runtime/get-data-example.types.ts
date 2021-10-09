export const GET_DATA_EXAMPLE_OPTIONS = {
  // Record definition that will be used to get data.
  recordDefinitionName: 'com.example.test210500:for data example',
  recordInstanceId: 'AGGAAC47FY79WAQSGUOFQSGUOFXMS9',
  // We will get the record instances where the Status (field 7) is New (value 0).
  queryExpression: '\'7\' = "0"',
  // List of the fields from 'com.example.test210500:for data example'.
  // We do not list the system fields as they are already defined in
  // RX_RECORD_DEFINITION.coreFieldIds.
  fields: {
    textFieldId: 536870915,
    timeFieldId: 536870914,
    attachmentFieldId: 536870913
  },
  // Association that will be used to get associated data (from restaurants and countries).
  associationDefinitionName: 'com.example.test210500:Restaurants are in Many Countries',
  pictureAllowedExtensions: ['JPG', 'JPEG', 'BMP', 'GIF', 'PNG']
}
