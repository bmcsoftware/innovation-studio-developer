import { ComponentFactoryResolver, NgModule } from '@angular/core';
import { RxViewComponentRegistryService, ViewComponentPropertyType } from '@helix/platform/view/api';
import { StarRatingComponent, StarRatingModule } from './runtime';
import { StarRatingDesignComponent, StarRatingDesignModel, StarRatingDesignModule } from './design';

@NgModule({
  imports: [StarRatingDesignModule, StarRatingModule]
})
export class StarRatingRegistrationModule {
  constructor(
    private rxViewComponentRegistryService: RxViewComponentRegistryService,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {
    rxViewComponentRegistryService.register({
      type: 'comExampleTest210500StarRating',
      name: 'Star Rating',
      group: 'Test 21.05.00',
      componentFactory: this.componentFactoryResolver.resolveComponentFactory(StarRatingComponent),
      icon: 'star',
      options: {
        canBeEmbeddedInRecordEditor: true
      },
      // We only define input parameters in the properties.
      // Output parameters are defined in the data dictionary and / or Settable properties.
      // Note:
      // Name property will be used but is not defined here, it is not necessary.
      properties: [
        {
          // This field is special and can be localized at runtime. During design time a value will be set for the default locale (English),
          // But using the localization feature other values can be set by locale.
          // The localized value will be displayed during local time, if it exists.
          // The values are not localized per view component, but by view of course.
          // The process to Export the localizable strings and Upload the values in another locales is described in the documentation:
          // https://docs.bmc.com/docs/display/helixplatform/Localizing+a+Digital+Service+application
          // For example the French version for this label are provided in the file "french_localization.json" that
          // contains the bundle localizable strings necessary to display the star-rating component in French.
          // In this test we have in the view "com.example.test210500:test star rating" the keys (in English):
          // -> "5ce91ccb-3a78-4f79-be77-229d76729778" set to "World",
          // -> "ef9315b2-c8ad-41fa-8f42-0ba882d6e8fd" set to "Hello",
          // In the Json file you can see the localized version in French:
          // -> "5ce91ccb-3a78-4f79-be77-229d76729778" set to "Monde",
          // -> "ef9315b2-c8ad-41fa-8f42-0ba882d6e8fd" set to "Bonjour",
          // An End User connecting to the view with a French web browser locale would see "Bonjour" and "Monde" in this view
          // for the two Star Rating View Components.
          name: 'label',
          type: ViewComponentPropertyType.String,
          localizable: true
        },
        {
          name: 'defaultNumberOfStars',
          type: ViewComponentPropertyType.Number
        },
        {
          name: 'numberOfStars',
          type: ViewComponentPropertyType.Number,
          enableExpressionEvaluation: true
        },
        {
          name: 'size',
          type: ViewComponentPropertyType.String
        },
        {
          name: 'isRequired',
          type: ViewComponentPropertyType.Boolean
        },
        {
          name: 'labelColor',
          type: ViewComponentPropertyType.String
        },
        {
          name: 'cssStyles',
          type: ViewComponentPropertyType.String
        },
        {
          name: 'hidden',
          type: ViewComponentPropertyType.Boolean,
          enableExpressionEvaluation: true
        },
        {
          name: 'disabled',
          type: ViewComponentPropertyType.Boolean,
          enableExpressionEvaluation: true
        }
      ],
      designComponentFactory: this.componentFactoryResolver.resolveComponentFactory(StarRatingDesignComponent),
      designComponentModel: StarRatingDesignModel,
      bundleId: 'com.example.test210500'
    });
  }
}
