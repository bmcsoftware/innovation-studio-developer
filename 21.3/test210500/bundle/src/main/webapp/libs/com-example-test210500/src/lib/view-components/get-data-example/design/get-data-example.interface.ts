import { IRxRecordGridApi } from '@helix/platform/view/components';

// We will have two input parameters in this view component, both will be
// grid view components.
export interface IGetDataExampleParameters {
  gridObject: IRxRecordGridApi;
  gridObjectAssociation: IRxRecordGridApi;
}
