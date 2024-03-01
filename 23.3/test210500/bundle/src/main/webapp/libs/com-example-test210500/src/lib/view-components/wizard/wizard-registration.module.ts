import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { WizardComponent, WizardModule } from './runtime';
import { WizardDesignComponent, WizardDesignModel, WizardDesignModule } from './design';

@NgModule({
  imports: [WizardDesignModule, WizardModule]
})
export class WizardRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500Wizard',
      name: 'Wizard',
      icon: 'left-list',
      group: 'Test 21.05.00',
      componentFactory: this.componentFactoryResolver.resolveComponentFactory(WizardComponent),
      properties: [
        {
          name: 'stepList'
        },
        {
          name: 'currentStep',
          enableExpressionEvaluation: true
        }
      ],
      designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(WizardDesignComponent),
      designComponentModel: WizardDesignModel,
      bundleId: 'com.example.test210500'
    });
  }
}
