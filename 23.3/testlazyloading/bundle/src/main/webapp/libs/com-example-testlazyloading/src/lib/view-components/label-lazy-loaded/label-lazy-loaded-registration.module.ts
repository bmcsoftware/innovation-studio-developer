import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { LabelLazyLoadedComponent, LabelLazyLoadedModule } from './runtime';
import { LabelLazyLoadedDesignComponent, LabelLazyLoadedDesignModel, LabelLazyLoadedDesignModule } from './design';

@NgModule({
  imports: [LabelLazyLoadedDesignModule, LabelLazyLoadedModule]
})
export class LabelLazyLoadedRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    rxViewComponentRegistryService.register({
      type: 'com-example-testlazyloading-label-lazy-loaded',
      name: 'Label Lazy Loaded',
      group: 'Test Lazy Loading',
      icon: 'left-loader',
      componentFactory: this.componentFactoryResolver.resolveComponentFactory(LabelLazyLoadedComponent),
      designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(LabelLazyLoadedDesignComponent),
      designComponentModel: LabelLazyLoadedDesignModel,
      bundleId: 'com.example.testlazyloading',
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
