import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { AdminPreferencesComponent, AdminPreferencesModule } from './runtime';
import { AdminPreferencesDesignComponent, AdminPreferencesDesignModel, AdminPreferencesDesignModule } from './design';

@NgModule({
  imports: [AdminPreferencesDesignModule, AdminPreferencesModule]
})
export class AdminPreferencesRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500AdminPreferences',
      name: 'Admin Preferences',
      icon: 'adjust_settings',
      group: 'Test 21.05.00',
      componentFactory: this.componentFactoryResolver.resolveComponentFactory(AdminPreferencesComponent),
      // There are no input parameters in this example.
      properties: [],
      designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(AdminPreferencesDesignComponent),
      designComponentModel: AdminPreferencesDesignModel,
      bundleId: 'com.example.test210500'
    });
  }
}
