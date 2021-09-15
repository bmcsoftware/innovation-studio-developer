import { NgModule } from '@angular/core';
import { RxViewActionRegistryService } from '@helix/platform/view/api';
import { MatrixActionService } from './matrix-action.service';
import { DynamicScriptLoaderServiceService } from '../../services/dynamic-service-loader.service';

/**
 * Sources:
 * Matrix: https://github.com/emilyxxie/green_rain/blob/master/README.md
 */
@NgModule({
  providers: [MatrixActionService, DynamicScriptLoaderServiceService]
})
export class MatrixActionModule {
  constructor(
    private rxViewActionRegistryService: RxViewActionRegistryService,
    private matrixActionService: MatrixActionService
  ) {
    this.rxViewActionRegistryService.register({
      // The best practice to avoid collision is to use in the action name
      // the fully qualified bundle name, for example:
      // <bundleId>Action<actionName>
      name: 'comExampleTest210500ActionMatrix',
      label: 'Matrix',
      bundleId: 'com.example.test210500',
      // Service that will be executed at runtime.
      service: this.matrixActionService,
      // Input parameters. We have none in this example.
      parameters: []
    })
  }
}
