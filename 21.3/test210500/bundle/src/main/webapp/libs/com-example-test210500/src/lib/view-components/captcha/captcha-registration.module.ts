import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { CaptchaComponent, CaptchaModule } from './runtime';
import { CaptchaDesignComponent, CaptchaDesignModel, CaptchaDesignModule } from './design';

// This view component leverages the hcaptcha solution:
// https://www.hcaptcha.com/
// Which provides a npm module:
// https://github.com/hCaptcha/ng-hcaptcha
@NgModule({
  imports: [CaptchaDesignModule, CaptchaModule]
})
export class CaptchaRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500Captcha',
      name: 'captcha using hcaptcha',
      icon: 'broken_image',
      group: 'Test 21.05.00',
      options: {
        canBeEmbeddedInRecordEditor: true
      },
      componentFactory: this.componentFactoryResolver.resolveComponentFactory(CaptchaComponent),
      properties: [
        {
          name: 'apiKey',
          enableExpressionEvaluation: true
        }
      ],
      designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(CaptchaDesignComponent),
      designComponentModel: CaptchaDesignModel,
      bundleId: 'com.example.test210500'
    });
  }
}
