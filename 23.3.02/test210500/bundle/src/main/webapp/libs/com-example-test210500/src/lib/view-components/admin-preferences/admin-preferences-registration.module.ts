import { NgModule } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { AdminPreferencesComponent } from './runtime';
import { AdminPreferencesDesignComponent, AdminPreferencesDesignModel } from './design';

@NgModule()
export class AdminPreferencesRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500AdminPreferences',
      name: 'Admin Preferences',
      icon: 'adjust_settings',
      group: 'Test 21.05.00',
      component: AdminPreferencesComponent,
      // There are no input parameters in this example.
      properties: [],
      designComponent: AdminPreferencesDesignComponent,
      designComponentModel: AdminPreferencesDesignModel
    });
  }
}
