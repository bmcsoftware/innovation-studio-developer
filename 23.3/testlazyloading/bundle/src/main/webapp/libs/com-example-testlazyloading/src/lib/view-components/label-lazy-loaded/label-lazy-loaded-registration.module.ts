import { NgModule } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { LabelLazyLoadedComponent } from './runtime';
import { LabelLazyLoadedDesignComponent, LabelLazyLoadedDesignModel } from './design';

@NgModule()
export class LabelLazyLoadedRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService
  ) {
    rxViewComponentRegistryService.register({
      type: 'com-example-testlazyloading-label-lazy-loaded',
      name: 'Label Lazy Loaded',
      group: 'Test Lazy Loading',
      icon: 'left-loader',
      component: LabelLazyLoadedComponent,
      designComponent: LabelLazyLoadedDesignComponent,
      designComponentModel: LabelLazyLoadedDesignModel,
      properties: [
        {
          name: 'message',
          localizable: true,
          enableExpressionEvaluation: true
        }
      ]
    });
  }
}
