import { IPlainObject } from '@helix/platform/shared/api';

// Input parameters
export interface ILifecycleParameters {
  recordDefinitionName: string;
  selectionFieldId: string;
  selectionValue: string;
  statusList?: IPlainObject;
}

export interface ILifeCycleOption {
  id: string;
  name: string;
}

export interface IAdaptWorkflowStep {
  label: string;
  icon?: string;
  variant?: string;
}

export interface ISelectionOptions {
  id: string;
  name: string;
}
