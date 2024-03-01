import { NgModule } from '@angular/core';
import { RxViewActionRegistryService } from '@helix/platform/view/api';
import { FruitPickerActionService } from './fruit-picker-action.service';
import { FruitPickerActionDesignModel } from './fruit-picker-action.design-model';
import { FooDesignManagerService } from './fruit-picker-design-manager.service';
import { GradientModule } from '../../inspectors/gradient/gradient.module';

@NgModule({
  imports: [GradientModule],
  providers: [FruitPickerActionService, FooDesignManagerService]
})
export class FruitPickerActionModule {
  constructor(
    private rxViewActionRegistryService: RxViewActionRegistryService,
    private fruitPickerActionService: FruitPickerActionService,
    private fooDesignManagerService: FooDesignManagerService
  ) {
    this.rxViewActionRegistryService.register({
      // The best practice to avoid collision is to use in the action name
      // the fully qualified bundle name, for example:
      // <bundleId>Action<actionName>
      name: 'comExampleTest210500ActionFruitPicker',
      label: 'Fruit Picker',
      // Service that will be executed at runtime.
      service: this.fruitPickerActionService,
      // The design manager will validate the input parameters at design time.
      designManager: this.fooDesignManagerService,
      // The output parameters are not defined in this file but
      // in the design model via the data dictionary.
      // In this example we will consume a custom rest api, passing
      // the fruit and its parameters and getting back a result.
      // Some of the input parameters will be dynamically created at runtime.
      designModel: FruitPickerActionDesignModel,
      // We declare as input parameters the fruit selector (which will be a dropdown)
      // and the fruit attributes.
      // The other options (color etc...) are dynamic depending on the fruit
      // and will be defined in the .design-model.ts.
      parameters: [
        {
          name: 'fruit',
          label: 'Fruit',
          isRequired: true
        }
        // The dynamic properties depend on the selected fruit and will be
        // stored as the string 'fruitAttributes.color' for example in the model.ts.
        // During validation in the manager.service.ts those dynamic parameters would be
        // tested as:
        // actionParameters['fruitAttributes.color'].
      ]
    })
  }
}
