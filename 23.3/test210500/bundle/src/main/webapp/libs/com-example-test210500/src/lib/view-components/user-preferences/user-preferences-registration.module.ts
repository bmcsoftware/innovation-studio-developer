import { NgModule } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { UserPreferencesComponent } from './runtime';
import { UserPreferencesDesignComponent, UserPreferencesDesignModel } from './design';

@NgModule()
export class UserPreferencesRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500UserPreferences',
      name: 'Accessing User Preferences',
      group: 'Test 21.05.00',
      // LMA:: TODO:: Add icon by default...
      icon: 'cloud_user',
      component: UserPreferencesComponent,
      // No input parameters in this example.
      properties: [],
      designComponent: UserPreferencesDesignComponent,
      designComponentModel: UserPreferencesDesignModel
    });
  }
}
