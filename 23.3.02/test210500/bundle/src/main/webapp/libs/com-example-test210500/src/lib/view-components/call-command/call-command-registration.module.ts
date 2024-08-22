import {  NgModule } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { CallCommandComponent } from './runtime';
import { CallCommandDesignComponent, CallCommandDesignModel } from './design';

// In this example we will call a custom Java command.
// Usually Commands do not return a result but this one will
// return a Json object.
// The command is defined in this Java class:
// src/main/java/com/example/bundle/Test210500GeneratePasswordCommand.java
@NgModule()
export class CallCommandRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500CallCommand',
      name: 'Call a command',
      icon: 'left-phone_circle',
      group: 'Test 21.05.00',
      component: CallCommandComponent,
      // In this example there are no input parameters.
      properties: [],
      designComponent: CallCommandDesignComponent,
      designComponentModel: CallCommandDesignModel
    });
  }
}
