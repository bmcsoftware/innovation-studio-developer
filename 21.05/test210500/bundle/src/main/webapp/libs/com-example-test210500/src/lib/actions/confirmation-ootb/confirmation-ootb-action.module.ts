import { NgModule } from '@angular/core';
import { RxViewActionRegistryService } from '@helix/platform/view/api';
import { ConfirmationOotbActionService } from './confirmation-ootb-action.service';
import { ConfirmationOotbActionDesignModel } from './confirmation-ootb-action.design-model';
import { ConfirmationOotbDesignManagerService } from './confirmation-ootb-design-manager.service';

@NgModule({
  providers: [ConfirmationOotbActionService, ConfirmationOotbDesignManagerService]
})
export class ConfirmationOotbActionModule {
  constructor(
    private rxViewActionRegistryService: RxViewActionRegistryService,
    private confirmationOotbActionService: ConfirmationOotbActionService,
    private confirmationOotbDesignManagerService: ConfirmationOotbDesignManagerService
  ) {
    this.rxViewActionRegistryService.register({
      // The best practice to avoid collision is to use in the action name
      // the fully qualified bundle name, for example:
      // <bundleId>Action<actionName>
      name: 'comExampleTest210500ActionConfirmationOotb',
      label: 'Confirmation (OOTB)',
      bundleId: 'com.example.test210500',
      // Service that will be executed at runtime.
      service: this.confirmationOotbActionService,
      // The design manager will validate the input parameters at design time.
      designManager: this.confirmationOotbDesignManagerService,
      // The design model will declare the input parameters at design time.
      designModel: ConfirmationOotbActionDesignModel,
      // The input parameters will be defined in more details in the design-model file.
      parameters: [
        {
          name: 'title',
          label: 'Title',
          isRequired: true,
          enableExpressionEvaluation: true
        },
        {
          name: 'message',
          label: 'Message',
          isRequired: true,
          enableExpressionEvaluation: true
        }
      ]
    })
  }
}
