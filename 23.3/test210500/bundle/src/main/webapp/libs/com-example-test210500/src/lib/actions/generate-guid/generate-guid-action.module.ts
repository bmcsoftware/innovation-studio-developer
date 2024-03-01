import { NgModule } from '@angular/core';
import { RxViewActionRegistryService } from '@helix/platform/view/api';
import { GenerateGuidActionService } from './generate-guid-action.service';
import { GenerateGuidActionDesignModel } from './generate-guid-action.design-model';
import { GenerateGuidDesignManagerService } from './generate-guid-design-manager.service';

@NgModule({
  providers: [GenerateGuidActionService, GenerateGuidDesignManagerService]
})
export class GenerateGuidActionModule {
  constructor(
    private rxViewActionRegistryService: RxViewActionRegistryService,
    private generateGuidService: GenerateGuidActionService,
    private generateGuidDesignManagerService: GenerateGuidDesignManagerService
  ) {
    this.rxViewActionRegistryService.register({
      // The best practice to avoid collision is to use in the action name
      // the fully qualified bundle name, for example:
      // <bundleId>Action<actionName>
      name: 'comExampleTest210500SActionGenerateGuid',
      label: 'Generate Guid',
      bundleId: 'com.example.test210500',
      // Service that will be executed at runtime.
      service: this.generateGuidService,
      // The design manager is used to validate the input parameter values.
      // For example to check that the prefix has a correct / allowed value.
      designManager: this.generateGuidDesignManagerService,
      // The output parameter is not defined in this file but
      // in the design model via the data dictionary.
      // Note:
      // We define again the input parameters in the Design Model.
      designModel: GenerateGuidActionDesignModel,
      parameters: [
        {
          name: 'prefix',
          label: 'Prefix',
          isRequired: true,
          enableExpressionEvaluation: true
        }
      ]
    })
  }
}
