import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService, ViewComponentPropertyType } from '@helix/platform/view/api';
import { GoogleMapsComponentComponent, GoogleMapsComponentModule } from './runtime';
import { GoogleMapsComponentDesignComponent, GoogleMapsComponentDesignModel, GoogleMapsComponentDesignModule } from './design';

// Note:
// We chose the name "google-maps-component" to avoid a naming collision with
// the Google Maps module itself (GoogleMapsModule).
//
// Source:
// https://jinalshah999.medium.com/official-angular-components-google-map-youtube-player-clipboard-67f04531ffc4
@NgModule({
  imports: [GoogleMapsComponentDesignModule,GoogleMapsComponentModule]
})
export class GoogleMapsComponentRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500GoogleMapsComponent',
      name: 'Google Maps',
      group: 'Test 21.05.00',
      icon: 'mapmarker',
      componentFactory: this.componentFactoryResolver.resolveComponentFactory(GoogleMapsComponentComponent),
      properties: [
        {
          name: 'apiKey',
          type: ViewComponentPropertyType.String
        },
        {
          name: 'addressName',
          type: ViewComponentPropertyType.String,
          enableExpressionEvaluation: true
        },
        {
          name: 'address',
          type: ViewComponentPropertyType.String,
          enableExpressionEvaluation: true
        }
      ],
      designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(GoogleMapsComponentDesignComponent),
      designComponentModel: GoogleMapsComponentDesignModel,
      bundleId: 'com.example.test210500'
    });
  }
}
