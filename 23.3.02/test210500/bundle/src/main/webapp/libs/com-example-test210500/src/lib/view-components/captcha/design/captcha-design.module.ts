import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CaptchaDesignComponent } from './captcha-design.component';

@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [CaptchaDesignComponent],
  entryComponents: [CaptchaDesignComponent]
})
export class CaptchaDesignModule {
}
