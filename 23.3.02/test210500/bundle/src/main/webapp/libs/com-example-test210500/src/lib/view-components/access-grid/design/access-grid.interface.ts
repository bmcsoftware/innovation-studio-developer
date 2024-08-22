import { IRxRecordGridApi } from "@helix/platform/view/api";

export interface IAccessGridParameters {
  gridViewComponent: IRxRecordGridApi;
  rowIndex: string;
  lastRefreshTime: string;
}
