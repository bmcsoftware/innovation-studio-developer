import { NgModule } from '@angular/core';
import { RxViewActionRegistryService } from '@helix/platform/view/api';
import { GetUserInformationActionService } from './get-user-information-action.service';
import { GetUserInformationActionDesignModel } from './get-user-information-action.design-model';

@NgModule({
  providers: [GetUserInformationActionService]
})
export class GetUserInformationActionModule {
  constructor(
    private rxViewActionRegistryService: RxViewActionRegistryService,
    private getUserInformationActionService: GetUserInformationActionService
  ) {
    this.rxViewActionRegistryService.register({
      // The best practice to avoid collision is to use in the action name
      // the fully qualified bundle name, for example:
      // <bundleId>Action<actionName>
      name: 'comExampleTest210500ActionGetUserInformation',
      label: 'Get User Information',
      bundleId: 'com.example.test210500',
      // Service that will be executed at runtime.
      service: this.getUserInformationActionService,
      // The output parameters are not defined in this file but
      // in the design model.
      designModel: GetUserInformationActionDesignModel,
      // In this example there are no input parameters.
      parameters: []
    })
  }
}
