import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService, ViewComponentPropertyType } from '@helix/platform/view/api';
import { IframeComponent, IframeModule } from './runtime';
import { IframeDesignComponent, IframeDesignModel, IframeDesignModule } from './design';

@NgModule({
  imports: [IframeDesignModule, IframeModule]
})
export class IframeRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500Iframe',
      icon: 'left-windows',
      name: 'iFrame view component',
      group: 'Test 21.05.00',
      componentFactory: this.componentFactoryResolver.resolveComponentFactory(IframeComponent),
      properties: [
        {
          name: 'url',
          enableExpressionEvaluation: true
        },
        {
          name: 'sandboxOptions',
          type: ViewComponentPropertyType.String
        },
        {
          name: 'cssStyles',
          enableExpressionEvaluation: true
        },
        {
          name: 'cssClasses',
          type: ViewComponentPropertyType.String
        },
        {
          name: 'addAllowFromDomain',
          type: ViewComponentPropertyType.Boolean
        }
      ],
      designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(IframeDesignComponent),
      designComponentModel: IframeDesignModel,
      bundleId: 'com.example.test210500'
    });
  }
}
