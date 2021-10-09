import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CaptchaComponent } from './captcha.component';
import { NgHcaptchaModule } from 'ng-hcaptcha';

// The NgHcaptchaModule.forRoot() is very important to avoid injection errors at runtime.
// https://github.com/hCaptcha/ng-hcaptcha
@NgModule({
  imports: [CommonModule, NgHcaptchaModule.forRoot()],
  exports: [CaptchaComponent],
  declarations: [CaptchaComponent],
  entryComponents: [CaptchaComponent]
})
export class CaptchaModule {
}
