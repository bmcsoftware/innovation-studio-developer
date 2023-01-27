import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { WebcamComponent, WebcamModule } from './runtime';
import { WebcamDesignComponent, WebcamDesignModel, WebcamDesignModule } from './design';

// We are leveraging the ngx-webcam library"
// https://github.com/basst314/ngx-webcam
@NgModule({
  imports: [WebcamDesignModule, WebcamModule]
})
export class WebcamRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500Webcam',
      name: 'Webcam',
      icon: 'webcamera',
      group: 'Test 21.05.00',
      componentFactory: this.componentFactoryResolver.resolveComponentFactory(WebcamComponent),
      options: {
        canBeEmbeddedInRecordEditor: true
      },
      // This view component does not have input parameters.
      properties: [],
      designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(WebcamDesignComponent),
      designComponentModel: WebcamDesignModel,
      bundleId: 'com.example.test210500'
    });
  }
}
