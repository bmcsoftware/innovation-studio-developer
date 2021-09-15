import { Tooltip } from '@helix/platform/shared/api';

// This interface is used to type the inspector input parameters in the view component or action model.ts file.
export interface ISliderOptions {
  minValue: number;
  maxValue: number;
  required?: boolean;
  tooltip?: Tooltip;
}
