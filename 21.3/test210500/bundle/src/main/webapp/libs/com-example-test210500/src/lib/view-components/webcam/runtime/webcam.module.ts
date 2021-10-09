import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WebcamComponent } from './webcam.component';
// We are leveraging the ngx-webcam library"
// https://github.com/basst314/ngx-webcam
// As our view component collides with the ngx-webcam module we need to alias it.
import { WebcamModule as NgxWebcamModule } from 'ngx-webcam';
import { AdaptAlertModule } from '@bmc-ux/adapt-angular';

@NgModule({
  imports: [CommonModule, NgxWebcamModule, AdaptAlertModule],
  exports: [WebcamComponent],
  declarations: [WebcamComponent],
  entryComponents: [WebcamComponent]
})
export class WebcamModule {
}
