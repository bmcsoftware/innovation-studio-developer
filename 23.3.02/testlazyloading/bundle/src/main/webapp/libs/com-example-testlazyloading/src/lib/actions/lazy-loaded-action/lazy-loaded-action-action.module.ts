import { NgModule } from '@angular/core';
import { RxViewActionRegistryService } from '@helix/platform/view/api';
import { LazyLoadedActionActionService } from './lazy-loaded-action-action.service';
import { LazyLoadedActionActionDesignManagerService } from './lazy-loaded-action-action-design-manager.service';
import { LazyLoadedActionActionDesignModel } from './lazy-loaded-action-action-design-model.class';

@NgModule({
  providers: [LazyLoadedActionActionService, LazyLoadedActionActionDesignManagerService]
})
export class LazyLoadedActionActionModule {
  constructor(
    private rxViewActionRegistryService: RxViewActionRegistryService,
    private lazyLoadedActionActionService: LazyLoadedActionActionService,
    private lazyLoadedActionActionDesignManagerService: LazyLoadedActionActionDesignManagerService
  ) {
    this.rxViewActionRegistryService.register({
      name: 'comExampleTestlazyloadingLazyLoadedAction',
      label: 'Lazy Loaded Action',
      // Service that will be executed at runtime.
      service: this.lazyLoadedActionActionService,
      // The design manager will validate the input parameters at design time.
      designManager: this.lazyLoadedActionActionDesignManagerService,
      // The output parameters are not defined in this file but
      // in the design model via the data dictionary.
      designModel: LazyLoadedActionActionDesignModel,
      // The input parameters will be defined in more details in the design-model file.
      parameters: [
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
