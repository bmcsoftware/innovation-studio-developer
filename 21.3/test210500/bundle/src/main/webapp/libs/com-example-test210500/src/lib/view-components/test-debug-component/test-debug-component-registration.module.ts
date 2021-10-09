import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService, ViewComponentPropertyType } from '@helix/platform/view/api';
import { TestDebugComponentComponent, TestDebugComponentModule } from './runtime';
import { TestDebugComponentDesignComponent, TestDebugComponentDesignModel, TestDebugComponentDesignModule } from './design';

// This view component contains several different input parameter types and is
// designed to test the "log-parameters" Component which can be used to debug
// the different input parameters during the development phase.
@NgModule({
  imports: [TestDebugComponentDesignModule, TestDebugComponentModule]
})
export class TestDebugComponentRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500TestDebugComponent',
      name: 'Testing Debug Component',
      icon: 'android',
      group: 'Test 21.05.00',
      componentFactory: this.componentFactoryResolver.resolveComponentFactory(TestDebugComponentComponent),
      // We display pretty much all the different inspectors.
      // All of them will be defined in the design.model.ts file.
      properties: [
        // Definition Object.
        {
          name: 'viewName',
          type: ViewComponentPropertyType.String
        },
        {
          name: 'recordName',
          type: ViewComponentPropertyType.String
        },
        {
          name: 'processName',
          type: ViewComponentPropertyType.String
        },
        {
          name: 'namedListName',
          type: ViewComponentPropertyType.String
        },
        {
          name: 'associationName',
          type: ViewComponentPropertyType.String
        },
        {
          name: 'chatbotName',
          type: ViewComponentPropertyType.String
        },
        // Values.
        {
          name: 'textValue',
          type: ViewComponentPropertyType.String
        },
        {
          name: 'numberValue',
          type: ViewComponentPropertyType.Number
        },
        {
          name: 'booleanValue',
          type: ViewComponentPropertyType.Boolean
        },
        {
          name: 'expressionValue',
          enableExpressionEvaluation: true
        },
        {
          name: 'textAreaValue'
        },
        {
          name: 'switchValue'
        },
        {
          name: 'selectValue'
        },
        {
          name: 'colorPickerValue'
        },
        {
          name: 'tagsValue'
        },
        // Custom Component inspectors (Form Control), here gradient.
        {
          name: 'gradient'
        }
      ],
      designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(TestDebugComponentDesignComponent),
      designComponentModel: TestDebugComponentDesignModel,
      bundleId: 'com.example.test210500'
    });
  }
}
