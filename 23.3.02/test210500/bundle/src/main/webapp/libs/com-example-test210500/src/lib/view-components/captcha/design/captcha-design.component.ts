import { Component, Input } from '@angular/core';
import { CaptchaDesignModel } from './captcha-design.model';

@Component({
  selector: 'com-example-test210500-com-example-test210500-captcha-design',
  styleUrls: ['./captcha-design.scss'],
  templateUrl: './captcha-design.component.html'
})
export class CaptchaDesignComponent {
  @Input()
  model: CaptchaDesignModel;
}
