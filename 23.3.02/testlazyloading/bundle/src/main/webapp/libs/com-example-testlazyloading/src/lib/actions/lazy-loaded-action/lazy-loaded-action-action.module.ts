import { NgModule } from '@angular/core';
import { RxViewActionRegistryService } from '@helix/platform/view/api';
import { LazyLoadedActionActionService } from './lazy-loaded-action-action.service';
import { LazyLoadedActionActionDesignManagerService } from './lazy-loaded-action-action-design-manager.service';
import { LazyLoadedActionActionDesignModel } from './lazy-loaded-action-action-design-model.class';

@NgModule({
  providers: [LazyLoadedActionActionService, LazyLoadedActionActionDesignManagerService]
})
export class LazyLoadedActionActionModule {
  // [23.3.02] Removing the "private" in the constructor, for example:
  //     private rxViewActionRegistryService: RxViewActionRegistryService,
  //     to:
  //     rxViewActionRegistryService: RxViewActionRegistryService,
  constructor(
    rxViewActionRegistryService: RxViewActionRegistryService,
    lazyLoadedActionActionService: LazyLoadedActionActionService,
    lazyLoadedActionActionDesignManagerService: LazyLoadedActionActionDesignManagerService
  ) {
    // [23.3.02] Calling the services directly since they are not private anymore, for example using:
    //     rxViewActionRegistryService.register() instead of:
    //     this .rxViewActionRegistryService.register()
    rxViewActionRegistryService.register({
      name: 'comExampleTestlazyloadingLazyLoadedAction',
      label: 'Lazy Loaded Action',
      // A service that will execute the view action at runtime.
      service: lazyLoadedActionActionService,
      // The design manager service responsible for view action parameter validation at design time.
      designManager: lazyLoadedActionActionDesignManagerService,
      // The design model class responsible for the design time behavior of the view action.
      designModel: LazyLoadedActionActionDesignModel,
      // The list of view action input parameters.
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
