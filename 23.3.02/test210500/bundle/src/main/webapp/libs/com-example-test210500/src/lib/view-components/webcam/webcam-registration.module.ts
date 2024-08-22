import { NgModule } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { WebcamComponent } from './runtime';
import { WebcamDesignComponent, WebcamDesignModel } from './design';

// We are leveraging the ngx-webcam library"
// https://github.com/basst314/ngx-webcam
@NgModule()
export class WebcamRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500Webcam',
      name: 'Webcam',
      icon: 'webcamera',
      group: 'Test 21.05.00',
      component: WebcamComponent,
      options: {
        canBeEmbeddedInRecordEditor: true
      },
      // This view component does not have input parameters.
      properties: [],
      designComponent: WebcamDesignComponent,
      designComponentModel: WebcamDesignModel
    });
  }
}
