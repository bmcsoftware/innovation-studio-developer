import { NgModule } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { WizardComponent } from './runtime';
import { WizardDesignComponent, WizardDesignModel } from './design';

@NgModule()
export class WizardRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500Wizard',
      name: 'Wizard',
      icon: 'left-list',
      group: 'Test 21.05.00',
      component: WizardComponent,
      properties: [
        {
          name: 'stepList'
        },
        {
          name: 'currentStep',
          enableExpressionEvaluation: true
        }
      ],
      designComponent: WizardDesignComponent,
      designComponentModel: WizardDesignModel
    });
  }
}
