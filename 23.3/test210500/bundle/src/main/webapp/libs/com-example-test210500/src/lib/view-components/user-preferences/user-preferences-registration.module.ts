import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService } from '@helix/platform/view/api';
import { UserPreferencesComponent, UserPreferencesModule } from './runtime';
import { UserPreferencesDesignComponent, UserPreferencesDesignModel, UserPreferencesDesignModule } from './design';

@NgModule({
  imports: [UserPreferencesDesignModule, UserPreferencesModule]
})
export class UserPreferencesRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500UserPreferences',
      name: 'Accessing User Preferences',
      group: 'Test 21.05.00',
      // LMA:: TODO:: Add icon by default...
      icon: 'cloud_user',
      componentFactory: this.componentFactoryResolver.resolveComponentFactory(UserPreferencesComponent),
      // No input parameters in this example.
      properties: [],
      designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(UserPreferencesDesignComponent),
      designComponentModel: UserPreferencesDesignModel,
      bundleId: 'com.example.test210500'
    });
  }
}
