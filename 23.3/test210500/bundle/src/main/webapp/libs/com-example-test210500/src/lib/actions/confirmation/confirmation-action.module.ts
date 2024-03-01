import { NgModule } from '@angular/core';
import { RxViewActionRegistryService } from '@helix/platform/view/api';
import { ConfirmationActionService } from './confirmation-action.service';
import { ConfirmationActionDesignModel } from './confirmation-action.design-model';
import { ConfirmationDesignManagerService } from './confirmation-design-manager.service';
import { ConfirmationActionComponent } from './dialog-component/confirmation-action.component';
import { AdaptRxLabelModule, AdaptRxTextfieldModule } from '@bmc-ux/adapt-angular';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [ConfirmationActionComponent],
  entryComponents: [ConfirmationActionComponent],
  imports: [
    AdaptRxLabelModule,
    AdaptRxTextfieldModule,
    FormsModule,
    TranslateModule
  ],
  providers: [ConfirmationActionService, ConfirmationDesignManagerService]
})
export class ConfirmationActionModule {
  constructor(
    private rxViewActionRegistryService: RxViewActionRegistryService,
    private confirmationActionService: ConfirmationActionService,
    private confirmationDesignManagerService: ConfirmationDesignManagerService
  ) {
    this.rxViewActionRegistryService.register({
      // The best practice to avoid collision is to use in the action name
      // the fully qualified bundle name, for example:
      // <bundleId>Action<actionName>
      name: 'comExampleTest210500ActionConfirmation',
      label: 'Confirmation',
      // Service that will be executed at runtime.
      service: this.confirmationActionService,
      // The design manager is used to validate the input parameters at design time.
      designManager: this.confirmationDesignManagerService,
      // The design model will declare the input and output parameters at design time.
      designModel: ConfirmationActionDesignModel,
      // The input parameters will be defined in more details in the design-model file.
      parameters: [
        {
          name: 'title',
          label: 'Title',
          localizable: true,
          isRequired: true,
          enableExpressionEvaluation: true
        },
        {
          name: 'message',
          label: 'Message',
          localizable: true,
          isRequired: true,
          enableExpressionEvaluation: true
        }
      ]
    })
  }
}
