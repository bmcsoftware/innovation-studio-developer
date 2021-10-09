import {AdaptProgressModel, AdaptProgressType} from '@bmc-ux/adapt-angular';
import {IAdaptWorkflowStep} from './lifecycle.interface';

export const LIFECYCLE_OPTIONS = {
  defaultSteps: [
    {
      label: 'New',
      icon: 'check_circle',
      variant: 'success'
    },
    {
      label: 'Pending',
      icon: 'exclamation_circle'
    },
    {
      label: 'Closed',
      icon: 'check_circle'
    }
  ] as IAdaptWorkflowStep[],
  defaultProgression: [
    {
      type: AdaptProgressType.success,
      value: 50
    },
    {
      type: AdaptProgressType.success,
      value: 0
    },
    {
      type: AdaptProgressType.success,
      value: 0
    }
  ] as AdaptProgressModel[],
  defaultSize: 'large'
}
