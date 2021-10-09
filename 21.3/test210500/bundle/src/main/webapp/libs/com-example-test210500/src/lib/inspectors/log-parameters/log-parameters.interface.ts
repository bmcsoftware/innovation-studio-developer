import { Tooltip } from '@helix/platform/shared/api';
import { Observable } from 'rxjs';

// This interface is used for the view component or action to provide the input parameters observable.
// This is usually done in the design model ts file.
export interface ILogParametersOptions {
  inputParameterAttributes$: Observable<any>;
  tooltip?: Tooltip;
  required?: boolean;
  label?: string;
}
