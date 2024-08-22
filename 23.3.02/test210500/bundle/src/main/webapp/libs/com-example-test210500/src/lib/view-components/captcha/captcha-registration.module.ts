import { NgModule } from '@angular/core';
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
    private rxViewComponentRegistryService: RxViewComponentRegistryService
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500Captcha',
      name: 'captcha using hcaptcha',
      icon: 'broken_image',
      group: 'Test 21.05.00',
      options: {
        canBeEmbeddedInRecordEditor: true
      },
      component: CaptchaComponent,
      properties: [
        {
          name: 'apiKey',
          enableExpressionEvaluation: true
        }
      ],
      designComponent: CaptchaDesignComponent,
      designComponentModel: CaptchaDesignModel
    });
  }
}
