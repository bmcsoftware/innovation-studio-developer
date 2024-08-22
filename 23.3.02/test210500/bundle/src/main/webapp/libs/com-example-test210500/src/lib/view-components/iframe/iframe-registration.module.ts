import { NgModule } from '@angular/core';
import { RxViewComponentRegistryService, ViewComponentPropertyType } from '@helix/platform/view/api';
import { IframeComponent } from './runtime';
import { IframeDesignComponent, IframeDesignModel } from './design';

@NgModule()
export class IframeRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500Iframe',
      icon: 'left-windows',
      name: 'iFrame view component',
      group: 'Test 21.05.00',
      component: IframeComponent,
      properties: [
        {
          name: 'url',
          enableExpressionEvaluation: true
        },
        // The sandbox options are irrelevant now as we cannot set those options dynamically anymore
        // in the new version of Angular:
        // https://angular.io/errors/NG0910
        // {
        //   name: 'sandboxOptions',
        //   type: ViewComponentPropertyType.String
        // },
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
      designComponent: IframeDesignComponent,
      designComponentModel: IframeDesignModel
    });
  }
}
