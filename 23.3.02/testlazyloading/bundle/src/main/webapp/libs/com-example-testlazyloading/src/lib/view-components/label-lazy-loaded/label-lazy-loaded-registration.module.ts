import { NgModule } from '@angular/core';
import { RX_STANDARD_PROPS_DESC, RxViewComponentRegistryService } from '@helix/platform/view/api';
import { LabelLazyLoadedComponent } from './runtime/label-lazy-loaded.component';
import { LabelLazyLoadedDesignComponent } from './design/label-lazy-loaded-design.component';
import { LabelLazyLoadedDesignModel } from './design/label-lazy-loaded-design.model';

@NgModule()
export class LabelLazyLoadedRegistrationModule {
  constructor(rxViewComponentRegistryService: RxViewComponentRegistryService) {
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
        },
        ...RX_STANDARD_PROPS_DESC
      ]
    });
  }
}
