import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseViewComponent, IViewComponent } from '@helix/platform/view/runtime';
import { ICaptchaParameters } from '../design/captcha.interface';
import { RxNotificationService } from '@helix/platform/shared/api';

// Official documentation:
// https://github.com/hCaptcha/ng-hcaptcha
@Component({
  selector: 'com-example-test210500-com-example-test210500-captcha',
  templateUrl: './captcha.component.html'
})
export class CaptchaComponent extends BaseViewComponent implements OnInit, IViewComponent {
  guid: string;
  config: Observable<any>;
  captcha: string;
  siteKey: string;

  private componentData: ICaptchaParameters;

  constructor(private rxNotificationService: RxNotificationService) {
    super();
  }

  ngOnInit() {
    this.config.subscribe((config: ICaptchaParameters) => {
      this.componentData = config;
      this.siteKey = this.componentData.apiKey;
    });
  }

  onVerify(token: string) {
    this.rxNotificationService.addSuccessMessage('Verification successful!');
    this.notifyPropertyChanged('hCaptchaResponseToken', token);
  }

  onExpired($event: any) {
    this.rxNotificationService.addWarningMessage('Token expired.');
    this.notifyPropertyChanged('hCaptchaResponseToken', null);
  }

  onError($event: any) {
    this.rxNotificationService.addErrorMessage('An error occured...');
    this.notifyPropertyChanged('hCaptchaResponseToken', null);
  }
}
