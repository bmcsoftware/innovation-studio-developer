import { StepsMenuItem } from '@bmc-ux/adapt-angular';

export interface IWizardParameters {
  stepList: StepsMenuItem[];
  currentStep: number;
}
